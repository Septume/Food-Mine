import { sample_foods, sample_tags, sample_users } from "./data";

import cors from "cors";
import express from "express";
// npm install jsonwebtoken
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/foods", (req, res) => {
    res.send(sample_foods);
})

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods
    .filter(food => food.nom.toLowerCase()
    .includes(searchTerm.toLowerCase()))
  res.send(foods);
})

app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
})

app.get("/api/foods/tag/:tagName", (req,res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods
  .filter(food => food.tags?.includes(tagName));
  res.send(foods);
})

app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const food = sample_foods.find(food => food.id == foodId);
  res.send(food);
})

app.post("/api/users/login", (req, res) => {
  const {email, password} = req.body;
  const user = sample_users.find(user => user.email === email &&
    user.password === password)

    if(user){
      res.send(generateTokenResponse(user));
    }else{
      res.status(400).send("User name or password is not valid!");
    }
})

const generateTokenResponse = (user:any) => {
 const token = jwt.sign({
  email:user.email, isAdmin:user.isAdmin
 }, "SomeRandomText", {
  expiresIn:"30d"
 });

 user.token = token;
 return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Le server du Nicosite est sur http://localhost:" + port);
})