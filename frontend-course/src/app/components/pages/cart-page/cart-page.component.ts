import { Component, OnInit } from '@angular/core';

import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from './../../../shared/models/Cartitem';
import { CartService } from './../../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cart!: Cart;

  constructor(private _cartService: CartService) {
      _cartService.getCartObservable().subscribe((cart) => {
        this.cart = cart;
    })
  }

  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    this._cartService.removeFromCart(cartItem._food.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    //parseInt() => analyse une chaine de caractère en argument et renvoie un entier
    const quantity = parseInt(quantityInString);
    this._cartService.changeQuantity(cartItem._food.id, quantity);
  }

}
