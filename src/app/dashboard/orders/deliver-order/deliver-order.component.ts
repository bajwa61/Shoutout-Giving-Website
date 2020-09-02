import {
  Component,
  OnInit
} from '@angular/core';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  UploadvideoService
} from 'src/_services/uploadvideo.service';
import {
  Observable
} from 'rxjs';
import {
  OrderService
} from 'src/_services/order.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-deliver-order',
  templateUrl: './deliver-order.component.html',
  styleUrls: ['./deliver-order.component.css']
})

// tslint:disable: variable-name
// tslint:disable: no-string-literal
export class DeliverOrderComponent implements OnInit {

  // Video upload variables
  fileToUpload: File = null;
  videoUploadPercentage: Observable < number > ;
  videoUploadSnapshot: Observable < any > ;

  order = {
    id: null,
    celebId: null,
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

  constructor(
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService,
    public _uploadvideoService: UploadvideoService,
    private _orderService: OrderService,
    private _celebrityService: CelebrityService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this._loadingService.loadingChanges.emit(true);
    this._route.params.subscribe(params => {
      this.getOrder(params['id']);
    });
  }

  getOrder(orderId: any) {
    this._orderService.getOrder(orderId).subscribe((fetchedOrder: any) => {
        this.order = fetchedOrder;
        this.order['id'] = orderId;
        this.order.occasion = this.order.occasion;
        this.order.status = this.order.status;
        this._loadingService.loadingChanges.emit(false);
      },
      error => {
        this._loadingService.loadingChanges.emit(false);
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this._uploadvideoService.uploadDeliveryVideo(this.fileToUpload, this.order.celebId);
    this.videoUploadPercentage = this._uploadvideoService.videoUploadPercentage;
    this.videoUploadSnapshot = this._uploadvideoService.videoUploadSnapshot;
  }


  deliverOrder() {
    this._loadingService.loadingChanges.emit(true);
    const data = {
      orderId: this.order['id'],
      videoFileName: this.fileToUpload.name,
      videoUrl: this._uploadvideoService.downloadURLvid,
    };

    this._celebrityService.makeDelivery(data).subscribe((res: any) => {
      this._notificationsService.success('Order delivered successfully.', '', {
        timeOut: 3000,
        clickToClose: true,
        clickIconToClose: true
      });
      this._router.navigate(['dashboard/order-single/' + this.order['id']]);
      this._loadingService.loadingChanges.emit(false);
    }, error => {
      if (error.status === 200) {
        this._notificationsService.success('Order delivered successfully.', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });
        this._router.navigate(['dashboard/order-single/' + this.order['id']]);
        this._loadingService.loadingChanges.emit(false);
      } else {
        this._loadingService.loadingChanges.emit(false);
      }
    });

  }

  ngOnInit(): void {}

}