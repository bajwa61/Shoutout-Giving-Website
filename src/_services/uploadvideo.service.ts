import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UploadvideoService {

  videoUploadTask: AngularFireUploadTask;
  downloadURLvid: string;
  videoUploadPercentage: Observable < number > ;
  videoUploadSnapshot: Observable < any > ;

  imageUploadTask: AngularFireUploadTask;
  downloadURLimg: string;
  imageUploadPercentage: Observable < number > ;
  imageUploadSnapshot: Observable < any > ;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  uploadVideo(file, id) {

    this.downloadURLvid = '';

    const path = `celebrity/${id}/video/${Date.now()}_${file.name}`;

    const ref = this.storage.ref(path);

    this.videoUploadTask = this.storage.upload(path, file);

    this.videoUploadPercentage = this.videoUploadTask.percentageChanges();

    this.videoUploadSnapshot = this.videoUploadTask.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURLvid = await ref.getDownloadURL().toPromise();
      }),
    );
  }

  uploadDeliveryVideo(file, id) {

    this.downloadURLvid = '';

    const path = `celebrity/${id}/video/deliveries/${file.name}`;

    const ref = this.storage.ref(path);

    this.videoUploadTask = this.storage.upload(path, file);

    this.videoUploadPercentage = this.videoUploadTask.percentageChanges();

    this.videoUploadSnapshot = this.videoUploadTask.snapshotChanges().pipe(
      tap(),
      finalize(async () => {
        this.downloadURLvid = await ref.getDownloadURL().toPromise();
      }),
    );
  }

  uploadImage(file, id) {

    this.downloadURLimg = '';

    const path = `celebrity/${id}/image/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);

    this.imageUploadTask = this.storage.upload(path, file);

    this.imageUploadPercentage = this.imageUploadTask.percentageChanges();

    this.imageUploadSnapshot = this.imageUploadTask.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURLimg = await ref.getDownloadURL().toPromise();
      }),
    );

  }

  uploadBannerImage(file, id) {

    const path = `homePageBanners/${id}/image/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);

    this.imageUploadTask = this.storage.upload(path, file);

    this.imageUploadPercentage = this.imageUploadTask.percentageChanges();

    this.imageUploadSnapshot = this.imageUploadTask.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURLimg = await ref.getDownloadURL().toPromise();
      }),
    );

  }

  isActive(videoUploadSnapshot) {
    return videoUploadSnapshot.state === 'running' && videoUploadSnapshot.bytesTransferred < videoUploadSnapshot.totalBytes;
  }

  isActive2(imageUploadSnapshot) {
    return imageUploadSnapshot.state === 'running' && imageUploadSnapshot.bytesTransferred < imageUploadSnapshot.totalBytes;
  }


}
