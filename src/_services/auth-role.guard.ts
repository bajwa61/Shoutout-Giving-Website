// import {
//   Injectable
// } from '@angular/core';
// import {
//   UserService
// } from './user.service';
// import jwt_decode from 'jwt-decode';
// @Injectable()

// // tslint:disable:variable-name
// export class AuthRoleGuard {

//   userRole: string;
//   constructor(
//     private _userService: UserService

//   ) {
//     this.getUser1();
//     this.decode(localStorage.getItem('token'));
//   }

//   getUser() {
//     let role: any;
//     role = (this._userService.getUserRole(localStorage.getItem('userToken')).subscribe((fetchedAgent: any) => {
//       role = fetchedAgent['Role'];
//       console.log(fetchedAgent);
//       console.log(role);
//       return role;
//     })).toString();
//     return role;
//   }

//   getUser2() {
//     let role: any;
//     role = this._userService.getUserRole(localStorage.getItem('userToken'));
//     return role;
//   }

//   getUser1() {
//     console.log(this.getUser());
//     console.log(this.getUser2());
//   }


//   decode(token: string) {
//     console.log(token);
//    // console.log(jwt_decode(localStorage.getItem('token')));
//     console.log(jwt_decode(localStorage.getItem('userToken')));
//   }

// }
