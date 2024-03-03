CREATE TABLE customers (
    sno SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    age INTEGER,
    phone VARCHAR(20),
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
