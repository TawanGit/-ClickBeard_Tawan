CREATE TABLE IF NOT EXISTS barber_specialties (
  barber_id INT NOT NULL,
  specialty_id INT NOT NULL,
  PRIMARY KEY (barber_id, specialty_id),
  FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES specialties(id) ON DELETE CASCADE
);
