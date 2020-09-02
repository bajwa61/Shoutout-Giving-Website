import {
  Injectable,
  Inject
} from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import * as path from './http.url';

@Injectable()

// tslint:disable:variable-name
export class PushNotificationsService {
  constructor(
    private _db: AngularFirestore,
    private http: HttpClient
  ) {}

  sendMiscNotification(request, collectionName) {
    return this._db.collection(collectionName).add({
      ...request
    });
  }

  sendContactUsMessage(request) {
    return this._db.collection('contactUsMessages').add({
      ...request
    });
  }

  sendUserNotification(data: any) {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(
      path.url + 'sendUserNotification?email=' +
      data.email + '&title=' + data.title + '&body=' + data.text + '&type=individualNotification', options
    );
  }

}