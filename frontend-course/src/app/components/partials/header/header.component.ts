import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartQuantity=0;

  constructor(private _cartService: CartService) {
  }

  ngOnInit(): void {
    this._cartService.getCartObservable().subscribe((newCart)=> {
      this.cartQuantity= newCart.totalCount;
    })
  }

}
