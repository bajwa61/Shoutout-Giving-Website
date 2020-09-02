import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  UserService
} from 'src/_services/user.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

// tslint:disable:variable-name
// tslint:disable:no-string-literal
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  celebrity: any;
  emailAddress: string;
  password: string;
  comformPassowrd: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _userService: UserService,
    private _loadingService: LoadingService,
    private _celebrityService: CelebrityService
  ) {}

  talentForm = new FormGroup({
    emailAddress: new FormControl('admin@halahi.com'),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  submitData() {
    if (this.talentForm.valid) {
      this._loadingService.loadingChanges.emit(true);
      const changeRequest = this.talentForm.getRawValue();
      if (changeRequest.password === changeRequest.confirmPassword) {
        this._userService.submitChangePassword(changeRequest).then(value => {
          this._loadingService.loadingChanges.emit(false);
          this._notificationsService.success('Password updated!', '', {
            timeOut: 3000,
            clickToClose: true,
            clickIconToClose: true
          });
          this._router.navigate(['dashboard']);
        });
      }
    } else {
      // tslint:disable-next-line:forin
      for (const property in this.talentForm.getRawValue()) {
        this.talentForm.controls[property].markAsTouched();
      }
    }
  }

  ngOnInit(): void {}

}
