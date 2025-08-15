CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  client_id INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  barber_id INT NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  appointment_date TIMESTAMPTZ NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'canceled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(barber_id, appointment_date)
);
