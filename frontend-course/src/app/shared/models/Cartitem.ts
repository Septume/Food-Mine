import { Food } from "./Food";

export class CartItem{

  constructor(public _food:Food) {}
    quantity:number = 1;
    price: number = this._food.prix;
}
