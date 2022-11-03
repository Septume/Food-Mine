import { Schema, model } from "mongoose";

export interface Food{
    id:string;
    nom:string;
    prix:number;
    tags: string[];
    favori:boolean;
    stars: number;
    imageUrl: string;
    origins: string[];
    tempsCuisson:string;
}

export const FoodSchema = new Schema<Food>(
    {
        nom: {type: String, required:true},
        prix: {type: Number, required:true},
        tags: {type: [String]},
        favori: {type: Boolean, required:false},
        stars: {type: Number, required:true},
        imageUrl: {type: String, required:true},
        origins: {type: [String], required:true},
        tempsCuisson: {type: String, required:true},
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

export const FoodModel = model<Food>('food', FoodSchema);