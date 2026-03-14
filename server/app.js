import express from 'express';
import cors from 'cors';
import sightingsRouter from './routes/sightings_route.js'
import userRouter from './routes/user_route.js';
import animalRouter from './routes/animal_route.js';
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/sightings", sightingsRouter);
app.use("/api/users", userRouter);
app.use("/api/individuals", animalRouter);

export default app;