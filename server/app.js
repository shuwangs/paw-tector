import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors);
app.use(express.json());

app.get('/', (req, res) => {
    res.json({info: 'testing of connection'});
})

export default app;