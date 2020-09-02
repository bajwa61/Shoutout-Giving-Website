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
import {
  AgentService
} from 'src/_services/agent.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

 // tslint:disable: variable-name
export class ChangePasswordComponent implements OnInit {

  celebrity: any;
  emailAddress: string;
  password: string;
  comformPassowrd: string;

  constructor(
    private _router: Router,
    private _notificationsService: NotificationsService,
    private _userService: UserService,
    private _loadingService: LoadingService,
    private _agentService: AgentService) {
    this._loadingService.loadingChanges.emit(true);
    this.getAgentEmail();
  }

  changePasswordForm = {
    emailAddress: null,
    password: null,
    confirmPassword: null,
  };

  talentForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  submitData() {
    if (this.talentForm.valid) {
      this._loadingService.loadingChanges.emit(true);
      this.setPasswordData();
      const changeRequest = this.changePasswordForm;
      if (changeRequest.password === changeRequest.confirmPassword) {
        this._userService.submitChangePassword(changeRequest).then(value => {
          this._loadingService.loadingChanges.emit(false);
          this._notificationsService.success('Password updated!', '', {
            timeOut: 3000,
            clickToClose: true,
            clickIconToClose: true
          });
          this._router.navigate(['agent-dashboard']);
        });
      }
    } else {
      // tslint:disable-next-line:forin
      for (const property in this.talentForm.getRawValue()) {
        this.talentForm.controls[property].markAsTouched();
      }
    }
  }

  getAgentEmail() {
    this._agentService.getAgent(localStorage.getItem('token')).subscribe((value: any) => {
      this.changePasswordForm.emailAddress = value.email;
      this._loadingService.loadingChanges.emit(false);
    }, error => {
      this._loadingService.loadingChanges.emit(false);
    });
  }

  setPasswordData() {
    this.changePasswordForm.password = this.talentForm.value.password;
    this.changePasswordForm.confirmPassword = this.talentForm.value.confirmPassword;
  }

  ngOnInit() {}

}
