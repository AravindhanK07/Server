const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.post("/add-drone", (req, res) => {
  const {
    drone_id,
    model,
    latitude,
    longitude,
    altitude,
    battery_level,
    task_status,
    spray_amount_left,
    seed_amount_left,
    flight_duration,
    speed,
    task_completion_rate,
  } = req.body;

  const query = `
      INSERT INTO drones (drone_id,model, latitude, longitude, altitude, battery_level, task_status, spray_amount_left, seed_amount_left, flight_duration, speed, task_completion_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    query,
    [
      drone_id,
      model,
      latitude,
      longitude,
      altitude,
      battery_level,
      task_status,
      spray_amount_left,
      seed_amount_left,
      flight_duration,
      speed,
      task_completion_rate,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting drone details:", err);
        res.status(500).send("Failed to add drone details.");
      } else {
        res.send("Drone details added successfully!");
      }
    }
  );
});

router.get("/drones", (req, res) => {
  const query = "SELECT * FROM drones";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving drone details:", err);
      res.status(500).send("Failed to retrieve drone details.");
    } else {
      res.json(results);
    }
  });
});

router.get("/drones/:drone_id", (req, res) => {
  const droneId = req.params.drone_id;

  const query = "SELECT * FROM drones WHERE id = ?";

  db.query(query, [droneId], (err, result) => {
    if (err) {
      console.error("Error retrieving drone details:", err);
      res.status(500).send("Failed to retrieve drone details.");
    } else if (result.length === 0) {
      res.status(404).send("Drone not found.");
    } else {
      res.json(result[0]);
    }
  });
});

router.put("/update-drone/:drone_id", (req, res) => {
  const droneId = req.params.drone_id;
  const {
    drone_id,
    model,
    latitude,
    longitude,
    altitude,
    battery_level,
    task_status,
    spray_amount_left,
    seed_amount_left,
    flight_duration,
    speed,
    task_completion_rate,
  } = req.body;

  const query = `
      UPDATE drones SET drone_id=?, model = ?, latitude = ?, longitude = ?, altitude = ?, battery_level = ?, task_status = ?, spray_amount_left = ?, seed_amount_left = ?, flight_duration = ?, speed = ?, task_completion_rate = ?
      WHERE drone_id = ?
    `;

  db.query(
    query,
    [
      drone_id,
      model,
      latitude,
      longitude,
      altitude,
      battery_level,
      task_status,
      spray_amount_left,
      seed_amount_left,
      flight_duration,
      speed,
      task_completion_rate,
      droneId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating drone details:", err);
        res.status(500).send("Failed to update drone details.");
      } else {
        res.send("Drone details updated successfully!");
      }
    }
  );
});

module.exports = router;
