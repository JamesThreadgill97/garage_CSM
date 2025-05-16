import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY start ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching events' });
  }
});

// GET a single event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching event' });
  }
});

// POST create a new event
router.post('/', async (req, res) => {
  const {
    title,
    start,
    end,
    customer_first_name,
    customer_last_name,
    vehicle_make,
    vehicle_model,
    registration,
    job_type,
    job_completed,
    notes,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO events 
      (title, start, "end", customer_first_name, customer_last_name, vehicle_make, vehicle_model, registration, job_type, job_completed, notes) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [title, start, end, customer_first_name, customer_last_name, vehicle_make, vehicle_model, registration, job_type, job_completed, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error creating event' });
  }
});

// PUT update an event by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    start,
    end,
    customer_first_name,
    customer_last_name,
    vehicle_make,
    vehicle_model,
    registration,
    job_type,
    job_completed,
    notes,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE events SET
        title=$1,
        start=$2,
        "end"=$3,
        customer_first_name=$4,
        customer_last_name=$5,
        vehicle_make=$6,
        vehicle_model=$7,
        registration=$8,
        job_type=$9,
        job_completed=$10,
        notes=$11
      WHERE id=$12
      RETURNING *`,
      [title, start, end, customer_first_name, customer_last_name, vehicle_make, vehicle_model, registration, job_type, job_completed, notes, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating event' });
  }
});

// DELETE an event by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted', event: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting event' });
  }
});

export default router;

