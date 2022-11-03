import { Router } from 'express';
import { UserModel } from '../models/user.model';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { sample_users } from '../data';

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if(usersCount> 0){
      res.send("Seed is already done!");
      return;
    }

    await UserModel.create(sample_users);
    res.send("Seed Is Done!");
}));


router.get("/", (req, res) => {
    res.send(sample_users);
})

router.post("/login", asyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email,password});

      if(user){
        res.send(generateTokenResponse(user));
      }else{
        const BAD_REQUEST = 400;
        res.status(BAD_REQUEST).send("User name or password is not valid!");
      }
  }
));
  
  const generateTokenResponse = (user:any) => {
   const token = jwt.sign({
    email:user.email, isAdmin:user.isAdmin
   }, "SomeRandomText", {
    expiresIn:"30d"
   });
  
   user.token = token;
   return user;
  }

  export default router;