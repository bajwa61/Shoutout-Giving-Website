import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import * as path from './http.url';

import {
  AngularFirestore
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
// tslint:disable:no-shadowed-variable
// tslint:disable:max-line-length
export class SubscribeService {

  mailChimpEndpoint = 'https://halahi.us19.list-manage.com/subscribe/post-json?u=086c63139b3715a783b815688&amp;id=0499e8da25';

  constructor(
    private http: HttpClient,
    private _db: AngularFirestore,
    private httpClient: HttpClient
  ) {}

  subscribeToList(data) {
    const params = new HttpParams()
      .set('EMAIL', data.emailAddress)
      .set('b_b736eb9e9077236cbd681a53b_4b66a82360', '');
    const mailChimpUrl = `${this.mailChimpEndpoint}&${params.toString()}`;
    return this.http.jsonp(mailChimpUrl, 'c');
  }

  signupToList(request) {
    return this.httpClient.get(path.url + 'marketingSignup?email=' + request);
  }

  getAllMarketingSignups() {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.get(path.url + 'getAllMarketingSignups', options);
  }

}
