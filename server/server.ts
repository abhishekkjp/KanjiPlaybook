import express, { Application } from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import kanjiRoutes from './routes/kanji'

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

// routes will be added here as we build them
app.get('/', (req:Request, res:Response) => {
    res.json({ message: 'Server is up' });
  });
 app.use('/api/kanji', kanjiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));