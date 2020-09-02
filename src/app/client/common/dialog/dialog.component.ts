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
  LanguageChangeService
} from 'src/_services/language-change.service';
import {
  NotificationsService
} from 'angular2-notifications';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class DialogComponent implements OnInit {

  currentRoute: any = '';
  langEng = true;
  overlayflag = true;
  dialogSignupForm = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
  });

  constructor(
    private _router: Router,
    private _subscribeService: SubscribeService,
    private _languageService: LanguageChangeService,
    private _notificationsService: NotificationsService,
  ) {
    this.currentRoute = this._router.url;
    if (localStorage.getItem('subscribed') && localStorage.getItem('subscribed') === 'false') {
      this.overlayflag = false;
    }
  }

  ngOnInit(): void {

    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }
  }

  signup() {

    if (this.dialogSignupForm.valid) {

      const signupData = {};
      signupData['emailAddress'] = this.dialogSignupForm.getRawValue().emailAddress;

      this._subscribeService.signupToList(signupData['emailAddress']).subscribe(res => {
        localStorage.setItem('subscribed', 'false');
        this._notificationsService.success('You have successfully signed up!', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });
        this.close();
      }, error => {
        if (error.status === 200) {
          localStorage.setItem('subscribed', 'false');
          this._notificationsService.success('You have successfully signed up!', '', {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            clickIconToClose: true
          });
          this.close();
        }
      });

    } else {
      // tslint:disable-next-line:forin
      for (const property in this.dialogSignupForm.getRawValue()) {
        this.dialogSignupForm.controls[property].markAsTouched();
      }
    }
  }

  close() {
    this.overlayflag = false;
  }

}
