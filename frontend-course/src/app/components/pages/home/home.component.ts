import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from './../../../services/food.service';
import { Observable } from 'rxjs';
import { Tag } from '../../../shared/models/Tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];

  constructor(private _foodService: FoodService,
              private _activatedRoute: ActivatedRoute) {}



  ngOnInit(): void {

    let foodObservable:Observable<Food[]>

    this._activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      foodObservable = this._foodService.getAllFoodsBySearchTerm(params.searchTerm);
        else if(params.tag)
      foodObservable = this._foodService.getAllFoodsByTag(params.tag)
        else
      foodObservable = this._foodService.getAll();

      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    })
  }
}
