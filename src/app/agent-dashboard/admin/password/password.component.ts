import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from 'src/_services/user.service';

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
    private _router: Router
  ) { }

  ngOnInit() {}

  resetEmail() {
    if (this.emailAddress) {
      this._userService.resetPassword(this.emailAddress.toLowerCase()).then(value => {
        this._router.navigate(['/']);
      });
    }}

}
