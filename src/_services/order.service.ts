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
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import * as path from './http.url';

@Injectable()

// tslint:disable:variable-name
export class OrderService {
  constructor(
    private _db: AngularFirestore,
    private http: HttpClient
  ) {}

  getRegisteredOrders() {
    return this._db
      .collection('orders', ref => ref
        .orderBy('date', 'desc'))
      .snapshotChanges();
  }

  getOrder(orderId) {
    return this._db
      .collection('orders').doc(orderId)
      .valueChanges();
  }

  getVideoUrl(celebId: string, orderId: string) {
    return this._db
      .collection('celebrity').doc(celebId)
      .collection('deliveries').doc(orderId)
      .valueChanges();
  }

  getprocessingOrders(orderId) {
    return this._db
      .collection('processingOrders').doc(orderId)
      .valueChanges();
  }

  getTransaction(orderId) {
    return this._db
      .collection('transactions').doc(orderId)
      .valueChanges();
  }

  updateOrder(data: any) {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(
      path.url +
      'editOrder?id=' + data.id +
      '&phone=' + data.phone +
      '&occasion=' + data.occasion +
      '&instructions=' + data.instructions +
      '&emailAddress=' + data.emailAddress +
      '&name=' + data.name +
      '&to=' + data.to +
      '&from=' + data.from +
      '&status=' + data.status, options
    );
  }

  createOrder(data: any) {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(
      path.url +
      'createDoc?emailAddress=' + data.emailAddress +
      '&celebId=' + data.celebId +
      '&celebrityName=' + data.celebrityName +
      '&phone=' + data.phone +
      '&price=' + data.price +
      '&status=' + data.status +
      '&instructions=' + data.instructions +
      '&name=' + data.name +
      '&occasion=' + data.occasion, options
    );
  }
}
