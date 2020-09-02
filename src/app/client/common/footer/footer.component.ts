import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  SubscribeService
} from 'src/_services/subscribe.service';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  LanguageChangeService
} from 'src/_services/language-change.service';
import {
  CategoryService
} from 'src/_services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

// tslint:disable:variable-name
// tslint:disable:member-ordering
// tslint:disable:no-string-literal
export class FooterComponent implements OnInit {

  currentRoute: any = '';
  langEng = true;
  categories = [];
  tempCategory = [];
  paymentMethodImg = '/assets/brands-img/payment-method.png';
  proudMemberImg = '/assets/brands-img/proud-member.png';
  ccAvenueImg1 = '/assets/brands-img/cc-avenue-1.png';
  ccAvenueImg2 = '/assets/brands-img/cc-avenue-2.png';
  paymentOptionImg1 = '/assets/brands-img/payment-option1.png';
  paymentOptionImg2 = '/assets/brands-img/payment-option2.png';
  paymentOptionImg3 = '/assets/brands-img/payment-option3.png';
  paymentOptionImg4 = '/assets/brands-img/payment-option4.png';
  paymentOptionImg5 = '/assets/brands-img/payment-option5.png';
  constructor(
    private _router: Router,
    private _subscribeService: SubscribeService,
    private _notificationsService: NotificationsService,
    private _languageService: LanguageChangeService,
    private _categoryService: CategoryService,
  ) {
    this.currentRoute = this._router.url;

    this.getAll();
  }

  getAll() {
    this._categoryService.getAllCategories().subscribe(categories => {
      this.categories = [];
      categories.forEach(category => {
        const tempCategory = category.payload.doc.data();
        tempCategory['id'] = category.payload.doc.id;
        this.categories.push(tempCategory);
      });
    });
  }

  ngOnInit(): void {

    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }
  }

  subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  subscribe() {
    if (this.subscribeForm.invalid) {
      return;
    }
    this._subscribeService.subscribeToList(this.subscribeForm.getRawValue())
      .subscribe(res => {
        this._notificationsService.success('You have been subscribed!', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });
      }, err => {
        console.log(err);
      });
  }

  changeLanguage(lang) {
    this._languageService.set('lang', lang);
    window.location.reload();
  }

}