import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserService
} from 'src/_services/user.service';
import {
  NotificationsService
} from 'angular2-notifications';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

// tslint:disable:variable-name
export class PasswordComponent implements OnInit {

  emailAddress = '';

  constructor(
    private _userService: UserService,
    private _notificationsService: NotificationsService,
    private _router: Router
  ) {}

  ngOnInit() {}

  resetEmail() {
    if (this.emailAddress) {
      this._userService.resetPassword(this.emailAddress).then(value => {

        this._notificationsService.success('Reset link has been sent to your email', '', {
          timeOut: 3000,
          clickToClose: true,
          clickIconToClose: true
        });

        if (localStorage.getItem('URL') === '/login') {
          this._router.navigate(['/login']);
        } else {
          this._router.navigate(['/agent-login']);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('sid');
      });
    }
  }

}
