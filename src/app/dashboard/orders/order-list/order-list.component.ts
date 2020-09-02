import {
  Component,
  OnInit
} from '@angular/core';
import {
  OrderService
} from 'src/_services/order.service';
import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class OrdersComponent implements OnInit {

  orders = [];
  isDataAvailable: boolean;
  constructor(
    private _orderService: OrderService,
    private _loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this._loadingService.loadingChanges.emit(true);
    this.isDataAvailable = false;
    this._orderService.getRegisteredOrders().subscribe(orders => {
      this.orders = [];
      if (orders.length > 0) {
        orders.forEach(category => {
          const tempCategory = category.payload.doc.data();
          tempCategory['id'] = category.payload.doc.id;
          this.orders.push(tempCategory);
        });
        this.isDataAvailable = true;
        this._loadingService.loadingChanges.emit(false);
      } else {
        this.isDataAvailable = false;
        this._loadingService.loadingChanges.emit(false);
      }
    }, err => {
      this.isDataAvailable = false;
      this._loadingService.loadingChanges.emit(false);
    });
  }

}
