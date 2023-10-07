use base64::{engine::general_purpose, Engine};
use diesel::connection::SimpleConnection;
use diesel::sqlite::SqliteConnection;
use diesel::Connection;
use dotenv::dotenv;
use log::{debug, info, warn};
use serde::{Deserialize, Serialize};
use simplelog::{ColorChoice, CombinedLogger, TermLogger, WriteLogger};
use std::env;
use std::{fs::File, io::Write};

use actix_web::{get, middleware, options, post, put, web, App, HttpServer, Responder};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize the logger.
    match CombinedLogger::init(vec![
        WriteLogger::new(
            log::LevelFilter::Debug,
            simplelog::Config::default(),
            File::create("bleulog.log").unwrap(),
        ),
        TermLogger::new(
            log::LevelFilter::Debug,
            simplelog::Config::default(),
            simplelog::TerminalMode::Mixed,
            ColorChoice::Auto,
        ),
    ]) {
        Ok(_) => debug!("Logger initialized"),
        Err(e) => debug!("Logger failed to initialize: {}", e),
    }

    const PORT: u16 = 8080;

    // Create the and instantiate database if it does not exist.
    let mut connection = establish_connection();
    // file path of schema is relative to Cargo.toml at 'data/schema.sql'
    connection
        .batch_execute(include_str!("../data/schema.sql"))
        .expect("Failed to create database");

    // Start the web server.
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .service(manager)
            .service(user_options)
            .service(get_all_users)
            .service(create_manager)
            .service(create_user)
            .service(create_donation)
    })
    .bind(("127.0.0.1", PORT))
    .unwrap_or_else(|_| {
        warn!("Can not bind to port {PORT}");
        std::process::exit(1)
    })
    .run()
    .await
}

#[derive(Deserialize, Debug, Serialize)]
struct User {
    username: String,
    email: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct Manager {
    username: String,
    email: String,
    password: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct Donation {
    user_id: usize,
    description: String,
    /// The image in bytes
    image: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct Optioned {
    extra: Option<String>,
}

/// Manager login to update the donation status
#[put("/status/{manager_id}")]
async fn manager(manager_id: web::Json<Manager>, donation: web::Json<Donation>) -> impl Responder {
    println!("Manager: {:?}", manager_id);
    println!("Donation: {:?}", donation);
    web::Json(donation.description.clone())
}

#[options("/user")]
async fn user_options(payload: web::Json<Optioned>) -> impl Responder {
    println!("Payload: {:?}", payload);
    web::Json(payload)
}

#[get("/users")]
async fn get_all_users() -> impl Responder {
    let users = vec![User {
        username: "user1".to_string(),
        email: "fake_email1@some_mail.com".to_string(),
    }];

    web::Json(users)
}

#[post("/manager")]
async fn create_manager(new_manager: web::Json<Manager>) -> impl Responder {
    println!("Manager: {:?}", new_manager);
    web::Json(new_manager.username.clone())
}

#[post("/user")]
async fn create_user(new_user: web::Json<User>) -> impl Responder {
    println!("User: {:?}", new_user);
    web::Json(new_user.username.clone())
}

#[post("/donation")]
async fn create_donation(new_donation: web::Json<Donation>) -> impl Responder {
    // Convert the base64 string to Vec<u8>
    let image_bytes: Vec<u8> = general_purpose::STANDARD
        .decode(&new_donation.image)
        .unwrap();

    {
        // Save the image to the disk
        let mut file = File::create("image.png").unwrap();
        file.write_all(&image_bytes).unwrap();
        file.flush().unwrap();
    }

    let image = "image.png";

    // Copy the file on disk to 'temp2.png'
    std::fs::copy(image, "temp2.png").unwrap();

    // Call the python script to process the image
    let _output = std::process::Command::new("python")
        .arg("process_image.py")
        .output()
        .expect("failed to execute process");

    make_a_donation(&new_donation);

    println!("Donation: {:?}", new_donation);
    web::Json(new_donation.description.clone())
}

/// Establish a connection to the database (SQLite)
fn establish_connection() -> SqliteConnection {
    debug!("Getting environment variables");
    dotenv().ok();

    debug!("Getting database url from environment variables");
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    debug!("Connecting to database");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

/// Save the donation data to a database
fn make_a_donation(donations: &Donation) {
    println!("Donation: {:?}", donations);

    let mut connection = establish_connection();
    info!("Connected to database");

    let _ = connection
        .batch_execute("INSERT INTO donations (user_id, description, image) VALUES ($1, $2, $3)");

    info!("Inserted donation into database");
}
