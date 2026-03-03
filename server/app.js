import express from 'express';
import cors from 'cors';
import sightingsRouter from './routes/sightings_route.js'
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/sightings", sightingsRouter);


export default app;