import { sample_foods, sample_tags } from './../../data';

import { Food } from '../shared/models/Food';
import { Injectable } from '@angular/core';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[]{
    return sample_foods
  }

  /**
   * Barre de recherche
   * @param searchTerm
   */
  getAllFoodsBySearchTerm(searchTerm:string){
    //toLowerCase => retourn tous en minuscule
    //includes => envois True si un tableau à une valeur et false à l'inverse
    return this.getAll().filter(food => food.nom.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllTags(): Tag[] {
    return sample_tags
  }


  getAllFoodsByTag(tag:string): Food[]{
    return tag === "All"?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag))
  }

  getFoodById(foodId:string):Food{
    // find => renvois la valeur du premier élément trouvé
    return this.getAll().find(food => food.id == foodId) ?? new Food();
  }

}
