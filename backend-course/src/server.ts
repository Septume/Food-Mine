import cors from "cors";
import express from "express";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);


const port = 5000;
app.listen(port, () => {
    console.log("Le server du Nicosite est sur http://localhost:" + port);
})