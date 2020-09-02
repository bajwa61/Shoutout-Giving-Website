import {Injectable, Inject} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import * as path from './http.url';

@Injectable()

export class EnrollService {
  constructor(
    // tslint:disable-next-line:variable-name
    private _db: AngularFirestore,
    private http: HttpClient
  ) {}

  sumbitEnrollRequest(request) {
    return this._db.collection('enrollRequests').add({
      ...request
    });
  }

  getAllRequest() {
    return this._db
    .collection('enrollRequests', ref => ref
    .orderBy('date', 'desc'))
    .snapshotChanges();
  }

  getRequest(requestId) {
    return this._db
      .collection('enrollRequests')
      .doc(requestId)
      .valueChanges();
  }

  deleteRequest(requestId) {
    return this._db
      .collection('enrollRequests')
      .doc(requestId)
      .delete();
  }

  sumbitAgentRequest(request) {
    return this._db.collection('agentsignup').add({
      ...request
    });
  }

  getAgentUrl(requ) {
    return this._db
    .collection('agents', ref =>
      ref.where('email', '==', requ)
    )
    .snapshotChanges();
  }

  getAllAgents() {
    return this._db.collection('agentsignup').snapshotChanges();
  }

  checkAgents(ipadr) {
    return this._db
    .collection('agents', ref =>
      ref.where('ipAddress', '==', ipadr)
    )
    .snapshotChanges();
  }

  makeConversion(request) {
    return this._db.collection('conversions').add({
      ...request
    });
  }

  getIPAddress() {
    return this.http.get('https://api.ipify.org/?format=json');
  }

}
