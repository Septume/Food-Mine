import { Component, OnInit } from '@angular/core';

import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/Cartitem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cart!: Cart;

  constructor(private _cartService: CartService) {
      this._cartService.getCartObservable().subscribe((cart) => {
        this.cart = cart;
    })
  }

  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    this._cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    //parseInt() => analyse une chaine de caractère en argument et renvoie un entier
    const quantity = parseInt(quantityInString);
    this._cartService.changeQuantity(cartItem.food.id, quantity);
  }

}
