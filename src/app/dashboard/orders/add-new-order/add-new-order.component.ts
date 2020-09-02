import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  OrderService
} from 'src/_services/order.service';
import {
  NotificationsService
} from 'angular2-notifications';

@Component({
  selector: 'app-add-new-order',
  templateUrl: './add-new-order.component.html',
  styleUrls: ['./add-new-order.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
// tslint:disable:prefer-const
// tslint:disable:no-shadowed-variable
export class AddNewOrderComponent implements OnInit {

  amount: string;
  myself = false;
  celebrity: any;

  orderForm = new FormGroup({
    name: new FormControl('', Validators.required),
    occasion: new FormControl('', Validators.required),
    instructions: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    phone: new FormControl('', Validators.required),
    notPublic: new FormControl(false, Validators.required),
    celebrityName: new FormControl('', Validators.required),
  });

  celebrities = [];
  constructor(
    private _loadingService: LoadingService,
    private _celebrityService: CelebrityService,
    private _orderService: OrderService,
    private _notificationsService: NotificationsService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.getAllCelebrities();
  }

  ngOnInit(): void {}

  getAllCelebrities() {
    this._celebrityService.getRegisteredCelebrities().subscribe((celebrity: any) => {
        celebrity.forEach(celebrity => {
          let singleCelebrity = celebrity.payload.doc.data();
          singleCelebrity['id'] = celebrity.payload.doc.id;
          this.celebrities.push(singleCelebrity);
        });
        this._loadingService.loadingChanges.emit(false);
      },
      error => {
        this._loadingService.loadingChanges.emit(false);
      });
  }

  addNewOrder() {
    this._loadingService.loadingChanges.emit(true);
    if (this.orderForm.valid) {
      let orderData = {};
      orderData['name'] = this.orderForm.getRawValue().name;
      orderData['occasion'] = this.orderForm.getRawValue().occasion;
      orderData['instructions'] = this.orderForm.getRawValue().instructions;
      orderData['emailAddress'] = this.orderForm.getRawValue().emailAddress.toLowerCase();
      orderData['phone'] = this.orderForm.getRawValue().phone;
      orderData['status'] = 'submitted';
      orderData['seenOnMobile'] = false;
      orderData['notPublic'] = this.orderForm.getRawValue().notPublic;

      orderData['celebId'] = this.celebrity.id;
      orderData['celebrityName'] = this.celebrity.fullName;
      orderData['price'] = this.celebrity.price;

      orderData['myself'] = true;
      orderData['date'] = new Date();

      this._orderService.createOrder(orderData).subscribe(res => {
        this._notificationsService.success('Order Created successfully.', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });
        this._loadingService.loadingChanges.emit(false);
      }, err => {
        this._notificationsService.success('Order Created successfully.', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });
        this._loadingService.loadingChanges.emit(false);
      });
    } else {
      // tslint:disable-next-line:forin
      for (const property in this.orderForm.getRawValue()) {
        this.orderForm.controls[property].markAsTouched();
      }
      this._loadingService.loadingChanges.emit(false);
    }
  }

  setCelebrity(email: any) {
    this.celebrity = this.celebrities.find(e => e.emailAddress === email);
  }

}
