import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartQuantity=0;
  user!: User;

  constructor(private _cartService: CartService, private _userService: UserService) {

    _cartService.getCartObservable().subscribe((newCart)=> {
      this.cartQuantity= newCart.totalCount;
    })

    _userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {
  }

  logout(){
    this._userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }

}
