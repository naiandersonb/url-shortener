import express, { Request, Response } from 'express';

const api = express();

api.get('/home', (req: Request, res: Response) => {
    res.json({ success: true });
});

api.listen(5000, () => {
    console.log('Express Listening in http://localhost:5000');
});