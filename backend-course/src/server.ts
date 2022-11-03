import cors from "cors";
import { dbConnect } from './configs/database.config';
import dotenv from 'dotenv';
import express from "express";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
dbConnect();
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

/**
 * retourne dans la console les quatres point suivant et verifier le code
 */
app.use((req, res, next)=>{
    console.warn("url= " + req.url)
    next()
})
app.use((req, res, next)=>{
    console.warn("body= " + req.body)
    next()
})
app.use((req, res, next)=>{
    console.warn("ip= " + req.ip)
    next()
})
app.use((req, res, next)=>{
    console.warn("headers= " + req.headers)
    next()
})

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);


const port = 5000;
app.listen(port, () => {
    console.log("Le server du site est sur http://localhost:" + port);
})