import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.scss']
})
export class OrderTrackPageComponent implements OnInit {

  order!:Order;
  constructor(
    _activatedRoute: ActivatedRoute,
    _orderService: OrderService) {
      const params = _activatedRoute.snapshot.params;
      if(!params.orderId) return;

      _orderService.trackOrderById(params.orderId).subscribe(order => {
        this.order = order;
      })
    }

  ngOnInit(): void {
  }

}
