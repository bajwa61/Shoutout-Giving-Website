import {Injectable, Inject} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as path from './http.url';

@Injectable()

// tslint:disable:variable-name
export class PageService {

  constructor(
    private _db: AngularFirestore,
  ) {}

  updatePage(pageData, pageId) {
    return this._db
      .collection('pages')
      .doc(pageId)
      .update({
        ...pageData
      });
  }

  getAllPages() {
    return this._db
      .collection('pages')
      .snapshotChanges();
  }

  getPage(pageId) {
    return this._db
      .collection('pages')
      .doc(pageId)
      .snapshotChanges();
  }

  getPageByType(type) {
    return this._db
      .collection('pages', ref => ref
      .where('type', '==', type))
      .snapshotChanges();
  }

}
