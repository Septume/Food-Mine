import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/shared/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  order:Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    _cartService: CartService,
    private _formBuidler: FormBuilder,
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _orderService: OrderService,
    private _router: Router) {

      const cart = _cartService.getCart();
      this.order.items = cart.items;
      this.order.totalPrice = cart.totalPrice;
    }

  ngOnInit(): void {

    let {name, address} = this._userService.currentUser;
    this.checkoutForm = this._formBuidler.group({
      name:[name, Validators.required],
      address:[address, Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }


  createOrder(){
    if(this.checkoutForm.invalid){
      this._toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    if(!this.order.addressLatLng){
      this._toastrService.warning('Please select your location on the map', 'Location');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this. _orderService.create(this.order).subscribe({
      next:() => {
        this._router.navigateByUrl('/payment');
      },
      error:(errorResponse) => {
        this._toastrService.error(errorResponse.error, 'Cart');
      }
    })

  }

}
