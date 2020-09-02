import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../_services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private _orderService:OrderService) { }
  orders= [];
  ngOnInit() {
    this._orderService.getRegisteredOrders().subscribe(orders => {
      this.orders = [];
      orders.forEach(category=>{
        let tempCategory = category.payload.doc.data();
        tempCategory['id'] = category.payload.doc.id;
        this.orders.push(tempCategory);
      })
    })
  }

}
