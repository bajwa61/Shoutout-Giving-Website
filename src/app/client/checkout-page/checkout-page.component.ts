import {
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  PaymentService
} from '../../../_services/payment.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})

// tslint:disable:no-string-literal
// tslint:disable:variable-name
// tslint:disable:ban-types
// tslint:disable:prefer-const
// tslint:disable:forin
export class CheckoutPageComponent implements OnInit {

  celebrity = {};
  id: string;
  myself = true;

  encRequest: String;
  accessCode: String;
  name: string;
  orderId: string;
  amount: string;

  checkoutForm = new FormGroup({
    // to: new FormControl('', ),
    // from: new FormControl('', ),
    name: new FormControl('', ),
    occasion: new FormControl('', [Validators.required]),
    instructions: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    phone: new FormControl('', [Validators.required]),
    notPublic: new FormControl(false, [Validators.required]),
    agree: new FormControl(null, [Validators.required]),
  });
  @ViewChild('form') form: ElementRef;

  constructor(
    private _route: ActivatedRoute,
    private _celebrityService: CelebrityService,
    private _router: Router,
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService,
    private apiService: PaymentService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getCelebrity();
    });
    this.accessCode = 'AVNE03HD40BD51ENDB';
  }

  getCelebrity() {
    this._celebrityService.getCelebrityByUserName(this.id).subscribe(
      (fetchedCelebrity) => {
        this.celebrity = fetchedCelebrity[0].payload.doc.data();
        this.celebrity['id'] = fetchedCelebrity[0].payload.doc.id;
      }
    );

  }

  forMyself(myself: boolean) {
    this.myself = myself;
  }

  submitData() {
    if (this.checkoutForm.valid) {

      this._loadingService.loadingChanges.emit(true);

      let deliveryData = {};
      deliveryData['occasion'] = this.checkoutForm.getRawValue().occasion;
      deliveryData['instructions'] = this.checkoutForm.getRawValue().instructions;
      deliveryData['emailAddress'] = this.checkoutForm.getRawValue().emailAddress.toLowerCase();
      deliveryData['phone'] = this.checkoutForm.getRawValue().phone;
      deliveryData['status'] = 'submitted';
      deliveryData['celebrityName'] = this.celebrity['fullName'];
      deliveryData['seenOnMobile'] = false;
      deliveryData['notPublic'] = this.checkoutForm.getRawValue().notPublic;
      deliveryData['celebId'] = this.celebrity['id'];
      deliveryData['name'] = this.checkoutForm.getRawValue().name;
      this.name = this.checkoutForm.getRawValue().name;
      this.amount = this.celebrity['price'];

      // if (!this.myself) {
      //   this.name = this.checkoutForm.getRawValue().from;
      //   deliveryData['from'] = this.checkoutForm.getRawValue().from;
      //   deliveryData['to'] = this.checkoutForm.getRawValue().to;
      //   deliveryData['name'] = this.checkoutForm.getRawValue().from;
      // }

      deliveryData['myself'] = this.myself;
      deliveryData['price'] = this.celebrity['price'];
      deliveryData['date'] = new Date();

      this._celebrityService.processDelivery(deliveryData).then(val => {

        return this.apiService.getEnc(this.amount, this.name, val).toPromise().then(response => {

          this.encRequest = response.toString();
          setTimeout(_ => this.form.nativeElement.submit());
          this._loadingService.loadingChanges.emit(false);

        }, error => {
          this._loadingService.loadingChanges.emit(false);
        });
      });

    } else {

      for (let property in this.checkoutForm.getRawValue()) {
        this.checkoutForm.controls[property].markAsTouched();
      }

    }

  }

}
