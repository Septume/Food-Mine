import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];

  constructor(private _foodService: FoodService, _activatedRoute: ActivatedRoute) {

    let foodsObservable: Observable<Food[]>;
    _activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
        foodsObservable = this._foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if(params.tag)
        foodsObservable = this._foodService.getAllFoodsByTag(params.tag)
      else
        foodsObservable = _foodService.getAll();

        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
    })
  }

  ngOnInit(): void {
console.log(this.foods);

  }

}
