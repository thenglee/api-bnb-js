CREATE TABLE places (
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT,
  country VARCHAR(50) NOT NULL,
  state VARCHAR(40) NOT NULL,
  city VARCHAR(40) NOT NULL,
  postal_code VARCHAR(30) NOT NULL,
  name VARCHAR(80) NOT NULL,
  description VARCHAR(400),
  price NUMERIC(7,2) NOT NULL,
  available BOOLEAN DEFAULT FALSE NOT NULL ,
  PRIMARY KEY(id),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
);
