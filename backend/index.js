import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

dotenv.config();

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { MONGO_URI, PORT } = process.env;
// console.log(MONGO_URI, PORT);
const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch(e => {
    console.log(e.message);
});

app.get('/', (req, res) => {
    return res.send('hi');
})

const port = PORT || 4000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
})

