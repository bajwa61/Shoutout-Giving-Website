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
export class CelebrityService {
  constructor(private _db: AngularFirestore, private httpClient: HttpClient) {}

  getAllCelebrities() {
    return this._db
      .collection('celebrity', (ref) => ref.where('active', '==', true))
      .snapshotChanges();
  }

  getAllFeaturedCelebrities() {
    return this.httpClient.get(
      path.url + 'getAllFeaturedCelebrities'
    );
  }

  getAllFilteredCelebrities(limit: number, startAt: number) {
    return this.httpClient.get(
      path.url + 'getAllCelebrities?limit=' + limit + '&startAt=' + startAt
    );
  }

  getMoreCelebrities(limit: number, startAt: string) {
    return this.httpClient.get(
      path.url + 'getAllCelebrities?limit=' + limit + '&startAt=' + startAt
    );
  }

  getRegisteredCelebrities() {
    return this._db
      .collection('celebrity', (ref) => ref.orderBy('name', 'asc'))
      .snapshotChanges();
  }

  getCelebrity(celebrityId: string) {
    return this._db.collection('celebrity').doc(celebrityId).valueChanges();
  }

  getCelebrityByUserName(userName: string) {
    return this._db
      .collection('celebrity', (ref) => ref.where('userName', '==', userName))
      .snapshotChanges();
  }

  getDeliveriesByCelebrityId(celebrityId) {
    return this._db
      .collection('celebrity')
      .doc(celebrityId)
      .collection('deliveries', (ref) =>
        ref.where('notPublic', '==', false).where('status', '==', 'delivered')
      )
      .snapshotChanges();
  }

  updateById(data, id) {
    return this._db
      .collection('celebrity')
      .doc(id)
      .update({
        ...data,
      });
  }

  deleteCelebrity(celebrityId) {
    return this._db.collection('celebrity').doc(celebrityId).delete();
  }

  postDelivery(celebrityId: string, deliveryData) {
    return this._db
      .collection('celebrity')
      .doc(celebrityId)
      .collection('deliveries')
      .add({
        ...deliveryData
      })
      .then((ref) => {
        return ref.id;
      });
  }

  processDelivery(deliveryData) {
    return this._db
      .collection('processingOrders')
      .add({
        ...deliveryData
      })
      .then((ref) => {
        return ref.id;
      });
  }

  getCelebrityByEmailEnrollRequests(email: string) {
    return (
      this._db
      // tslint:disable-next-line:no-shadowed-variable
      .collection('enrollRequests', (x) =>
        x.where('emailAddress', '==', email)
      )
      .valueChanges()
    );
  }

  getCelebrityByEmail(email: string) {
    return (
      this._db
      // tslint:disable-next-line:no-shadowed-variable
      .collection('celebrity', (x) => x.where('emailAddress', '==', email))
      .valueChanges()
    );
  }

  makeDelivery(data: any) {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.get(
      path.url + 'makeDelivery?orderId=' + data.orderId +
      '&videoFileName=' + data.videoFileName +
      '&videoUrl=' + data.videoUrl, options
    );
  }

}