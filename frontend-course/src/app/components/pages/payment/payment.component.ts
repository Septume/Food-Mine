import { Component, OnInit } from '@angular/core';

import { Order } from 'src/app/shared/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  order:Order = new Order();

  constructor(_orderService: OrderService, _router: Router) {
    _orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error:() => {
        _router.navigateByUrl('/checkout');
      }
    })
  }

  ngOnInit(): void {
  }

}
