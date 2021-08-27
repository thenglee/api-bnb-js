CREATE TABLE places (
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT,
  country VARCHAR(50) NOT NULL,
  state VARCHAR(40) NOT NULL,
  city VARCHAR(40) NOT NULL,
  postal_code VARCHAR(30),
  name VARCHAR(80) NOT NULL,
  description VARCHAR(400),
  price NUMERIC(7,2),
  available BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY(id),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
);
