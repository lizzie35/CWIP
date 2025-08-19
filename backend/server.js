const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001; // Change the port number

app.use(cors()); // Ensure CORS is enabled
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CWIP',
  password: 'Briella',
  port: 5432,
});

// AgedItems API
app.get('/api/aged-items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.aged_items');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// OngoingOntrack API
app.get('/api/ongoing-ontrack', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.ongoing_ontrack');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Save date API for updating the "On Air Date" in the database
app.post('/api/on-air-date', async (req, res) => {
  const { projectName, onAirDate } = req.body;

  if (!projectName || !onAirDate) {
    console.error('Invalid request body:', req.body);
    return res.status(400).send('Project name and on-air date are required');
  }

  try {
    const query = `
      UPDATE public.aged_items
      SET "On Air Date" = $1
      WHERE "Project Name" = $2
    `;
    await pool.query(query, [onAirDate, projectName]);
    res.status(200).send('Date saved successfully');
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/on-air-date', async (req, res) => {
  try {
    const result = await pool.query('SELECT "Project Name", "On Air Date" FROM public.aged_items');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// CompletedItems API
app.get('/api/completed-items', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT "Project Name", "Period", "Stakeholders", "Responsibility", "Current CIP", "Total", "On Air Date"
      FROM public.aged_items
      WHERE "On Air Date" IS NOT NULL
    `);
    console.log(result.rows); // Debugging: Log fetched data
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
