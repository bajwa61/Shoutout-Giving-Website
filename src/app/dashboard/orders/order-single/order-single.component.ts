import {
  Component,
  OnInit
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  ActivatedRoute
} from '@angular/router';
import {
  OrderService
} from 'src/_services/order.service';
import {
  LoadingService
} from 'src/_services/loading.service';

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
    private _orderService: OrderService,
    private _loadingService: LoadingService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this._route.params.subscribe(params => {
      this.getOrder(params['id']);
    });
  }

  order = {};
  videoUrl: any;
  ngOnInit() {}

  getOrder(orderId: string) {
    this._orderService.getOrder(orderId).subscribe((fetchedOrder: any) => {
        this.order = fetchedOrder;
        this.order['id'] = orderId;
        if (fetchedOrder.celebId) {
          this.getOrderVideoURL(fetchedOrder.celebId, orderId);
        } else {
          this._loadingService.loadingChanges.emit(false);
        }
      },
      error => {
        this._loadingService.loadingChanges.emit(false);
      });
  }

  getOrderVideoURL(celebId: string, orderId: string) {
    this._orderService.getVideoUrl(celebId, orderId).subscribe((fetchedOrder: any) => {
        this.videoUrl = fetchedOrder.videoUrl;
        this._loadingService.loadingChanges.emit(false);
      },
      error => {
        this._loadingService.loadingChanges.emit(false);
      });
  }

}
