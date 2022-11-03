import { sample_foods, sample_tags } from '../data';

import { FoodModel } from '../models/food.model';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if(foodsCount> 0){
      res.send("Seed is already done!");
      return;
    }

    await FoodModel.create(sample_foods);
    res.send("Seed Is Done!");
}))


router.get("/",asyncHandler(
  async (req, res) => {
    const foods = await FoodModel.find();
      res.send(foods);
  }
))

router.get("/search/:searchTerm", asyncHandler(
  async (req, res) => {
    //RegExp => compart des string
    //filter => compart des objets
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    //await => attend la résolution d'une pormesse
    const foods = await FoodModel.find({nom: {$regex:searchRegex}})
    res.send(foods);
  }
))

router.get("/tags", asyncHandler(
  async  (req, res) => {
    //aggregate -MongoDB-=> créer un pipe
    // => $unwind => déconstruit un champ de tableau
    // => $group => sépare les documents en groupes selon une "clé de groupe".
    const tags = await FoodModel.aggregate([
      {
        $unwind:'$tags'
      },
      {
        $group:{
          _id: '$tags',
          //renvois le somme numérique
          count: {$sum: 1}
        }
      },
      {
        //Transmet les documents avec les champs demandés à l'étape suivante du pipeline
        $project:{
          _id: 0,
          nom:'$_id',
          count:'$count'
        }
      }
    ]).sort({count: -1});

    const all = {
      nom : 'All',
      count: await FoodModel.countDocuments()
    }

    tags.unshift(all);
    res.send(tags);
  }
))

router.get("/tag/:tagName", asyncHandler(
  async (req,res) => {
    const foods = await FoodModel.find({tags:req.params.tagName});
    res.send(foods);
  }
))

router.get("/:foodId",asyncHandler(
  async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId)
    res.send(food);
  }
))

export default router;