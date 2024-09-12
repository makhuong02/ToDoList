import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// database
const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'TodoApp',
    password: 'makhuong2002',
    port: '5432'
});

db.connect();

// get data by month
app.get('/data/:year/:month', async (req, res) => {
	const { year, month } = req.params;
	
	try {
		const result = await db.query(
			`SELECT *
			FROM "Task"
			WHERE
				EXTRACT(year FROM date) = $1 AND
				EXTRACT(month FROM date) = $2`,
			[year, month]);
		
		if (result.rows.length > 0) {
			console.log(result.rows);
			
			res.status(200).json(result.rows);
		} else {
			res.status(200).json([])
		}
	} catch (err) {
		console.error('Error: ', err);
		res.status(500).json({ message: 'Error loading data' })
	}
});

// get data by date
app.get('/data/:year/:month/:date', async (req, res) => {
	const { year, month, date } = req.params;
	console.log(req.params);
	
	try {
		const result = await db.query(
			`SELECT id, title, task, completed
			FROM "Task"
			WHERE date = $1`,
			[`${year}-${month}-${date}`]);
		
		if (result.rows.length > 0) {
			console.log(result.rows);
			
			res.status(200).json(result.rows);
		} else {
			res.status(200).json([])
		}
	} catch (err) {
		console.error('Error: ', err);
		res.status(500).json({ message: 'Error loading data' })
	}
});

app.post('/add', async (req, res) => {
    const { id, title, task, dateStr } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO "Task" VALUES ($1, $2, $3, $4)',
            [id, title, task, dateStr]
        );
		if (result.rowCount !== 0) {
			res.sendStatus(201);
		} else {
			res.sendStatus(409);
		}
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

// update completed status
app.patch('/data/:id', async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	try {
        const result = await db.query(
            'UPDATE "Task" SET completed = $1 WHERE id = $2',
            [status, id]
        );
		if (result.rowCount !== 0) {
			res.sendStatus(201);
		} else {
			res.sendStatus(409);
		}
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.delete('/data/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const result = await db.query('DELETE FROM "Task" WHERE id = $1', [id]);

		if (result.rowCount > 0) {
			res.status(200).json({ message: 'Delete successfully' });
		} else {
			res.status(404).json({ message: 'Data is not existed' });
		}
	} catch (err) {
		console.error('Error: ', err);
		res.status(500).json({ message: 'Error'});
	}
});