import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAG_URL, FOODS_URL } from './../shared/constants/urls';
import { sample_foods, sample_tags } from './../../data';

import { Food } from '../shared/models/Food';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Food[]> {
    return this._http.get<Food[]>(FOODS_URL);
  }


  getAllFoodsBySearchTerm(searchTerm:string){
    return this._http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this._http.get<Tag[]>(FOODS_TAG_URL);
  }


  getAllFoodsByTag(tag:string): Observable<Food[]>{
    return tag === "All"?
    this.getAll():
    this._http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId:string):Observable<Food>{
    return this._http.get<Food>(FOODS_BY_ID_URL + foodId);
  }

}
