import {
  Component,
  OnInit
} from '@angular/core';
import {
  OrderService
} from 'src/_services/order.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  ConversionsService
} from 'src/_services/conversions.service';

@Component({
  selector: 'app-celebrity-orders',
  templateUrl: './celebrity-orders.component.html',
  styleUrls: ['./celebrity-orders.component.css']
})

// tslint:disable:no-string-literal
// tslint:disable:variable-name
export class CelebrityOrdersComponent implements OnInit {

  orders = [];
  allOrders: boolean;

  constructor(
    private _conversionsService: ConversionsService,
    private _route: ActivatedRoute,
    private _loadingService: LoadingService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.allOrders = false;
    this._route.params.subscribe((params) => {
      this.getAllAgentConversions(params.id);
    });
  }

  ngOnInit(): void {}

  getAllAgentConversions(id) {
    this._conversionsService.getAllDeliveredOrdersByCelebrityId(id).subscribe((orders) => {
      this.orders = [];
      if (orders.length > 0) {
        orders.forEach(category => {
          const tempCategory = category.payload.doc.data();
          tempCategory['id'] = category.payload.doc.id;
          this.orders.push(tempCategory);
        });
        this.allOrders = true;
        this._loadingService.loadingChanges.emit(false);
      } else {
        this.allOrders = false;
        this._loadingService.loadingChanges.emit(false);
      }
    }, error => {
      this.allOrders = false;
      this._loadingService.loadingChanges.emit(false);
    });
  }

}
