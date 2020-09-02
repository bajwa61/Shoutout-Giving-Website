import { async } from '@angular/core/testing';
import {
  Injectable,
  EventEmitter
} from '@angular/core';
import {
  Subscription
} from 'rxjs/internal/Subscription';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  Router
} from '@angular/router';
import {
  UserService
} from './user.service';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  LoadingService
} from './loading.service';
import {
  AgentService
} from './agent.service';
import * as path from './http.url';
import {
  HttpClient
} from '@angular/common/http';
import {

  HttpHeaders
} from '@angular/common/http';
import { StateService } from './state.service';
@Injectable({
  providedIn: 'root'
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class EventEmitterService {

  invokelogoutFunction = new EventEmitter();
  subsVar: Subscription;

  constructor(
    private _afAuth: AngularFireAuth,
    private _userService: UserService,
    private _router: Router,
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService,
    private _agentService: AgentService,
    private _httpClient: HttpClient,
    private _stateService: StateService
  ) { }

  invokelogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('sid');
    this._afAuth.auth.signOut();
    this._router.navigate(['/login']);
    this._loadingService.loadingChanges.emit(false);
  }


  login(emailAddress, password) {
    if (emailAddress || password) {

      this._afAuth.auth.signInWithEmailAndPassword(emailAddress, password).then(value => {
        this._userService.getUser(value.user.uid).subscribe(

          async user => {
            if (user.payload.data()['Role'] === 'admin') {
              localStorage.setItem('token', await this._afAuth.auth.currentUser.getIdToken());
              localStorage.setItem('sid', btoa('admin' + user.payload.data()['client']));

              this._router.navigate(['/dashboard']);
            } else {
              this.invokelogout();
              this._notificationsService.error('Wrong Admin Credentials!', '', {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
                clickIconToClose: true
              });
            }

            this._loadingService.loadingChanges.emit(false);
          }
        );

      }).catch(error => {
        this._notificationsService.error('Wrong UserName or Password!', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });
        this._loadingService.loadingChanges.emit(false);
      });
    }
  }

  agentLogin(emailAddress, password) {
    if (emailAddress || password) {
      this._afAuth.auth.signInWithEmailAndPassword(emailAddress, password).then(value => {
        this._userService.getUser(value.user.uid).subscribe(
          user => {
            if (user.payload.data()['Role'] === 'agent') {
              this._router.navigate(['agent-dashboard']);
              localStorage.setItem('token', user.payload.data()['agents']);

              localStorage.setItem('sid', btoa('agent' + user.payload.data()['agents']));
              this._stateService.setIsLogin(true);

            } else {
              this.agentLogout();
              this._notificationsService.error('Wrong Agent Credentials!', '', {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
                clickIconToClose: true
              });
            }
            this._loadingService.loadingChanges.emit(false);
          }
        );

      }).catch(error => {
        this._notificationsService.error('Wrong UserName or Password!', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });
        this._loadingService.loadingChanges.emit(false);
      });
    }
  }

  agentLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('sid');
    this._afAuth.auth.signOut();
    this._router.navigate(['/agent-login']);
    this._loadingService.loadingChanges.emit(false);
  }

  registerView() {

    return this._httpClient
      .get(path.url + 'trafficControl', {
        responseType: 'text'
      });
  }

}
