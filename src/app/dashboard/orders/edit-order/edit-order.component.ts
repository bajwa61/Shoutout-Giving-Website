import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  OrderService
} from 'src/_services/order.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  NotificationsService
} from 'angular2-notifications';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class EditOrderComponent implements OnInit {

  order = {
    id: null,
    celebrityName: null,
    occasion: null,
    instructions: null,
    phone: null,
    emailAddress: null,
    name: null,
    to: null,
    from: null,
    status: null,
    myself: null
  };

  statusList = [{
      name: 'Submitted',
      value: 'submitted'
    },
    {
      name: 'Delivered',
      value: 'delivered'
    },
    {
      name: 'Cancelled',
      value: 'cancelled'
    },
    {
      name: 'Overdue',
      value: 'overdue'
    },

  ];

  constructor(
    private _route: ActivatedRoute,
    private _orderService: OrderService,
    private _loadingService: LoadingService,
    private _notificationsService: NotificationsService,
    private _router: Router) {
    this._loadingService.loadingChanges.emit(true);
    this._route.params.subscribe(params => {
      this.getOrder(params['id']);
    });
  }

  ngOnInit(): void {}

  getOrder(orderId: any) {
    this._orderService.getOrder(orderId).subscribe((fetchedOrder: any) => {
        this.order = fetchedOrder;
        console.log(fetchedOrder);
        this.order['id'] = orderId;
        this.order.occasion = this.order.occasion;
        this.order.status = this.order.status;
        this._loadingService.loadingChanges.emit(false);
      },
      error => {
        this._loadingService.loadingChanges.emit(false);
      });
  }

  updateOrder() {

    this._loadingService.loadingChanges.emit(true);

    const updatedOrder = {
      id: this.order.id,
      occasion: this.order.occasion,
      instructions: this.order.instructions,
      phone: this.order.phone,
      emailAddress: this.order.emailAddress,
      name: this.order.name,
      to: this.order.name,
      from: this.order.name,
      status: this.order.status
    };

    this._orderService.updateOrder(updatedOrder).subscribe(
      (response: any) => {
        this._notificationsService.success('Order Updated successfully.', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });
        this._router.navigate(['/dashboard/order-single/' + this.order['id']]);
        this._loadingService.loadingChanges.emit(false);
      }, error => {
        if (error.status === 200) {
          this._notificationsService.success('Order Updated successfully.', '', {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            clickIconToClose: true
          });
          this._router.navigate(['/dashboard/order-single/' + this.order['id']]);
        }
        this._loadingService.loadingChanges.emit(false);
      }
    );
  }

}
