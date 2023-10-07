use log::{debug, error, info, trace, warn};
use serde::{Deserialize, Serialize};
use simplelog::{ColorChoice, CombinedLogger, TermLogger, WriteLogger};
use std::fs::File;

use actix_web::{middleware, options, post, put, web, App, HttpServer, Responder};

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

    // Start the web server.
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .service(manager)
    })
    .bind(("127.0.0.1", PORT.into()))
    .unwrap_or_else(|_| {
        warn!("Can not bind to port {PORT}");
        std::process::exit(1)
    })
    .run()
    .await
}

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
    image: Vec<u8>,
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


