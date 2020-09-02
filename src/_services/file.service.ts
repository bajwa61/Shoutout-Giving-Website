import {
    Injectable
} from '@angular/core';
import {
    AngularFireModule
} from '@angular/fire';
import {
    AngularFireDatabase
} from '@angular/fire/database';
import * as firebase from 'firebase';
import * as path from './http.url';

@Injectable()

// tslint:disable:no-inferrable-types
// tslint:disable:prefer-const
export class FileService {

    private basePath: string = '/categories';

    constructor(
        private af: AngularFireModule,
        private db: AngularFireDatabase
    ) {}

    pushUploadToDatabase(upload, callback: (finalupload) => void) {

        let storageRef = firebase.storage().ref();

        console.log(`${this.basePath}/${upload.name}`);

        let uploadTask = storageRef.child(`${this.basePath}/${upload.name}`).put(upload);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {},
            (error) => {}, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
                    upload.url = downloadUrl;
                    callback(upload);
                });
            }
        );

    }

}
