import {
  Injectable
} from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import * as path from './http.url';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  // tslint:disable-next-line:variable-name
  constructor(private _db: AngularFirestore) {}


  getAllAgents() {
    return this._db
      .collection('agents', x => x
        .orderBy('date', 'desc'))
      .snapshotChanges();
  }

  getAgent(agentId: string) {
    return this._db
      .collection('agents')
      .doc(agentId)
      .valueChanges();
  }

  getAgentByRef(ref: string) {
    return this._db
      .collection('agents', x => x.where('ref', '==', ref))
      .valueChanges();
  }

  updateById(data, id) {
    return this._db
      .collection('agents')
      .doc(id)
      .update({
        ...data
      });
  }

  deleteAgent(id: any) {
    return this._db.collection('agents').doc(id).delete();
  }
}
