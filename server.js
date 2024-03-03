
  

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your database connection details
const pool = new pg.Pool({
    user: 'sql6688076',
  host: 'sql6.freesqldatabase.com',
  database: 'sql6688076',
  password: 'WZKFDT1ZGc',
  port: 3306,
});


app.get('/customers', async (req, res) => {
    let { page = 1, searchTerm = '' } = req.query;
    page = parseInt(page);

    try {
        const offset = (page - 1) * 20; // Adjust for pagination

        let queryString = `SELECT sno, customer_name, age, phone, location, to_char(created_at, 'YYYY-MM-DD') AS date, to_char(created_at, 'HH24:MI') AS time FROM customers`;
        const searchColumns = ['customer_name', 'location'];

        if (searchTerm) {
            const searchClause = searchColumns.map(col => `<span class="math-inline">\{col\} ILIKE '%</span>{searchTerm}%'`).join(' OR ');
            queryString += ` WHERE ${searchClause}`;
        }

        queryString += ` ORDER BY created_at DESC LIMIT 20 OFFSET ${offset}`;

        const result = await pool.query(queryString);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
