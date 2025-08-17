CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    message TEXT NOT NULL, 
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
    );