import {
  Injectable
} from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  HttpClient
} from '@angular/common/http';
import * as path from './http.url';
import {
  HttpHeaders
} from '@angular/common/http';

@Injectable()

// tslint:disable:variable-name
// tslint:disable:no-string-literal
// tslint:disable:no-shadowed-variable
// tslint:disable:max-line-length
export class UserService {

  constructor(
    private _db: AngularFirestore,
    private _auth: AngularFireAuth,
    private httpClient: HttpClient
  ) {}

  checkUser(email) {
    return this.httpClient
      .get(
        path.url + 'checkUserExists?email=' + email, {
          responseType: 'text'
        }
      );
  }

  createUser(rawUser) {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.get(path.url + 'creatingCeleb?email=' + rawUser['emailAddress'] + '&password=' + rawUser['password'], options);
  }

  resetPassword(emailAddress) {

    return this._auth.auth.sendPasswordResetEmail(emailAddress).then(value => {
      return value;
    }).catch(error => {});

  }

  getUsers() {
    return this._db.collection('users').snapshotChanges();
  }

  getUser(userId) {
    return this._db.collection('users').doc(userId).snapshotChanges();
  }

  submitChangePassword(request) {
    return this._db.collection('tempPasswordChange').add({
      ...request
    });
  }

  getUserRole(userId) {
    return this._db.collection('users').doc(userId).valueChanges();
  }
}
