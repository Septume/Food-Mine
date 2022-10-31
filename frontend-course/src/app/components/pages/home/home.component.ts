import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from './../../../services/food.service';
import { Tag } from '../../../shared/models/Tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];

  constructor(private _foodService: FoodService,
              private _activatedRoute: ActivatedRoute) {

    _activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      this.foods = this._foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if(params.tag)
      this.foods = this._foodService.getAllFoodsByTag(params.tag)
      else
      this.foods = _foodService.getAll();
    })
  }

  ngOnInit(): void {
  }

}
