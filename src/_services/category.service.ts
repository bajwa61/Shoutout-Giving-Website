import {Injectable, Inject} from '@angular/core';
import {
  AngularFirestore,
} from '@angular/fire/firestore';
import * as path from './http.url';

@Injectable()
export class CategoryService {
  constructor(
    // tslint:disable-next-line:variable-name
    private _db: AngularFirestore,
  ) {
  }

  createCategory(categoryData) {
    return this._db
      .collection('categories')
      .add({...categoryData});
  }

  updateCategory(categoryData, categoryId) {
    return this._db
      .collection('categories')
      .doc(categoryId)
      .update({...categoryData});
  }

  getAllCategories() {
    return this._db
      .collection('categories')
      .snapshotChanges();
  }

  deleteCategory(categoryId) {
    return this._db.collection('categories').doc(categoryId).delete();
  }

}
