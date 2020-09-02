import {
  Injectable,
  Inject
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  CanActivateChild,
  ActivatedRoute
} from '@angular/router';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  Observable
} from 'rxjs';
import * as path from './http.url';
import {
  UserService
} from './user.service';


@Injectable()

// tslint:disable:variable-name
export class AuthAgentGuard implements CanActivate, CanActivateChild {

  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _userService: UserService
  ) {}

  currentRoute = '';
  role: string;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable < boolean > | boolean {

    if (localStorage.getItem('token') != null && atob(localStorage.getItem('sid')).startsWith('agent') === true) {
      return true;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('sid');
    this._router.navigate(['/agent-login']);
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable < boolean > | boolean {
    return this.canActivate(route, state);
  }

}
