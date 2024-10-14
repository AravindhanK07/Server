CREATE TABLE drones (
  drone_id INT PRIMARY KEY,
  model VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT,
  altitude FLOAT,
  battery_level FLOAT,
  task_status VARCHAR(255),
  spray_amount_left FLOAT,
  seed_amount_left FLOAT,
  flight_duration INT,
  speed FLOAT,
  task_completion_rate FLOAT
);