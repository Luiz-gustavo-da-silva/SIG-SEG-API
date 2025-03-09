import express, {Application, Request, Response} from 'express'
import { PORT } from './secrets';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});