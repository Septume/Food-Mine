import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/shared/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements OnInit {

  @Input()
  order!:Order;

  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;

  constructor(
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router,
    private _toastrService: ToastrService) { }

  ngOnInit(): void {

    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self._orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this._cartService.clearCart();
              this._router.navigateByUrl('/track/' + orderId);
              this._toastrService.success(
                'Payment Saved Successfully',
                'Success'
              );
            },
            error: (error) => {
              this._toastrService.error('Payment Save Failed', 'Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this._toastrService.error('Payment Failed', 'Error');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);

  }

}
