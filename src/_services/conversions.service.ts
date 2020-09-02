import {
  Injectable
} from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  HttpClient
} from '@angular/common/http';
import * as path from './http.url';

@Injectable({
  providedIn: 'root'
})

// tslint:disable:variable-name
export class ConversionsService {

  constructor(
    private _db: AngularFirestore,
    private httpClient: HttpClient
  ) {}

  getAllConversions() {
    return this._db
      .collection('conversions')
      .snapshotChanges();
  }

  getAllAgentConversions(ref: string) {
    return this._db
      .collection('conversions', x => x.where('ref', '==', ref))
      .snapshotChanges();
  }

  getRecentAgentConversions(ref: string) {
    return this._db
      .collection('conversions', x => x
        .where('ref', '==', ref)
        .limit(4))
      .snapshotChanges();
  }

  getAllDeliveredOrdersByCelebrityId(celebrityId) {
    return this._db
      .collection('conversions')
      .doc(celebrityId)
      .collection('deliveries')
      .snapshotChanges();
  }

  getConversionById(conversionId: string) {
    return this._db.collection('conversions').doc(conversionId).valueChanges();
  }

  getAllAgentOrders(ref: any) {
    return this.httpClient
      .get(
        path.url + 'getAllDeliveries?ref=' + ref
      );
  }

}
