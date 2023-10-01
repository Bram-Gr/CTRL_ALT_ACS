-- BEGIN TRANSACTION;

-- DROP TABLE IF EXISTS donations_status;
-- DROP TABLE IF EXISTS donations;
-- DROP TABLE IF EXISTS managers;
-- DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50),
    password VARCHAR(50),
    user_id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS managers (
    username VARCHAR(50),
    password VARCHAR(50),
    manager_id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS donations (
    donation_id SERIAL PRIMARY KEY,
    description VARCHAR(250),
    image BYTEA NOT NULL,
    user_id INTEGER,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS donation_status (
    donation_id INTEGER,
    status VARCHAR(250),
    CONSTRAINT fk_donation_id FOREIGN KEY (donation_id) REFERENCES donations(donation_id)
);

-- COMMIT TRANSACTION;