import { BehaviorSubject, Observable } from 'rxjs';

import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/Cartitem';
import { Food } from '../shared/models/Food';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart : Cart = this.getCartFromLocalStorage();
  //behaviorSubject => obtenir une valeur sans avoir besoin d'en fournir une au départ
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(food: Food): void {
    let cartItem = this.cart.items
    // find => renvois la première valeur de l'élément trouver
    .find(item => item._food.id === food.id);
    if(cartItem)
    return;

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void{
    this.cart.items = this.cart.items
      .filter(item => item._food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items
    // find => renvois la première valeur de l'élément trouver
    .find(item => item._food.id === foodId)
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem._food.prix;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void{
    this.cart.totalPrice = this.cart.items
    // reduce() => traite mes valeurs de gauche à droite
    .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
    // reduce() => traite mes valeurs de gauche à droite
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0)
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson)
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}
