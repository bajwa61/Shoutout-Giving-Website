
// import {
//   Component,
//   OnInit
// } from '@angular/core';
// import {
//   Router
// } from '@angular/router';
// import {
//   LoadingService
// } from '../../../_services/loading.service';
// import {
//   EventEmitterService
// } from '../../../_services/emitter.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })


// export class LoginComponent implements OnInit {
//   email;
//   password;
//   URL;
//   constructor(
//     private eventEmitterService: EventEmitterService,
//     // tslint:disable-next-line:variable-name
//     private _loadingService: LoadingService,
//     private router: Router
//   ) {}


//   ngOnInit() {}


//   loginChecker() {
//     this._loadingService.loadingChanges.emit(true);
//     this.URL = this.router.url;
//     if (this.URL === '/login') {
//       this.login();
//     } else if (this.URL === '/agent-login') {
//       this.agentLogin();
//     }
//   }


//   login() {
//     this.eventEmitterService.login(this.email, this.password);
//   }


//   agentLogin() {
//     this.eventEmitterService.agentLogin(this.email, this.password);
//   }


//   setUrl() {
//     localStorage.setItem('URL', this.router.url);
//   }


// }
