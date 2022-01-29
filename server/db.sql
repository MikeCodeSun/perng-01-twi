CREATE DATABASE twitter;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(254) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password VARCHAR(254) NOT NULL,
  create_at TIMESTAMP DEFAUlT NOW(),

  CONSTRAINT check_email CHECK(email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
  CONSTRAINT check_password CHECK(length(password) >= 6)
);

CREATE TABLE post (
  post_id SERIAL PRIMARY KEY,
  body VARCHAR(255) NOT NULL,
  create_at TIMESTAMP DEFAUlT NOW(),
  creater INT NOT NULL REFERENCES users(user_id)
);

ALTER TABLE post 
ADD COLUMN creater_name VARCHAR(255) NOT NULL;
