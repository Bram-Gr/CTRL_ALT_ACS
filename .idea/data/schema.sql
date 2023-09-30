BEGIN TRANSACTION;

DROP TABLE IF EXISTS donations_status CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS managers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE managers (
    manager_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE donations (
    donation_id SERIAL PRIMARY KEY,
    description VARCHAR(250),
    image BYTEA NOT NULL,
    user_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES managers(manager_id)
);

CREATE TABLE donation_status (
    donation_id INTEGER,
    status VARCHAR(250),
    CONSTRAINT fk_donation_id FOREIGN KEY (donation_id) REFERENCES donations(donation_id)
);

COMMIT TRANSACTION;