import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm = '';

  constructor(private _activitedRoute: ActivatedRoute,
              private _router: Router) {

  _activitedRoute.params.subscribe((params) => {
    if(params.searchTerm)
    this.searchTerm = params.searchTerm
    });
  }

  ngOnInit(): void {
  }

  search(term:string): void {
    if(term)
    this._router.navigateByUrl('/search/'+ term);
  }

}
