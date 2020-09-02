import {Injectable, Inject} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as path from './http.url';

@Injectable()

// tslint:disable:variable-name
export class DashboardService {

  constructor(
    private _db: AngularFirestore,
  ) {}

  getSalesStatus(startDate, endDate) {
    return this._db
        .collection('sales', ref => ref
        .orderBy('date', 'desc')
        .where('date', '>', startDate)
        .where('date', '<', endDate))
        .snapshotChanges();
  }

  getMoneyGenerated(startDate, endDate) {
    return this._db
        .collection('sales', ref => ref
        .orderBy('date', 'desc')
        .where('date', '>', startDate)
        .where('date', '<', endDate))
        .snapshotChanges();
  }

  getStarsEnrolled(startDate, endDate) {
    return this._db
        .collection('enrollRequests', ref => ref
        .orderBy('date', 'desc')
        .where('date', '>', startDate)
        .where('date', '<', endDate))
        .snapshotChanges();
  }

  getRecentOrders() {
    return this._db
        .collection('orders', ref => ref
        .orderBy('date', 'desc')
        .limit(4))
        .snapshotChanges();
  }

}
