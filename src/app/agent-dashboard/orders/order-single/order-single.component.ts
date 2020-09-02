import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from 'src/_services/order.service';

@Component({
  selector: 'app-order-single',
  templateUrl: './order-single.component.html',
  styleUrls: ['./order-single.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class OrderSingleComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _orderService: OrderService
  ) {}

  order = {};

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.getOrder(params['id']);
    });
  }

  getOrder(orderId) {
    this._orderService.getOrder(orderId).subscribe((fetchedOrder) => {
      this.order = fetchedOrder;
      this.order['id'] = orderId;
    });
  }

}
