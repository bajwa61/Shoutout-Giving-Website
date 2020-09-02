import {
  Component,
  OnInit
} from '@angular/core';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-all-stars',
  templateUrl: './all-stars.component.html',
  styleUrls: ['./all-stars.component.css']
})

// tslint:disable:no-string-literal
// tslint:disable:variable-name
// tslint:disable:no-shadowed-variable
// tslint:disable:prefer-const
export class AllStarsComponent implements OnInit {

  searchText: any;
  celebrities = [];
  backupCelebrities = [];
  isDataAvailable: boolean;

  constructor(
    private _userService: CelebrityService,
    private _loadingService: LoadingService,
    private _notificationsService: NotificationsService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.isDataAvailable = false;
    this.getAll();
  }

  ngOnInit() {}

  getAll() {
    this._userService.getRegisteredCelebrities().subscribe((celebrity) => {
        this.celebrities = [];
        this.backupCelebrities = [];
        if (celebrity.length > 0) {
          celebrity.forEach(celebrity => {
            let singleCelebrity = celebrity.payload.doc.data();
            singleCelebrity['id'] = celebrity.payload.doc.id;
            this.celebrities.push(singleCelebrity);
            this.backupCelebrities.push(singleCelebrity);
          });
          this.isDataAvailable = true;
          this._loadingService.loadingChanges.emit(false);
        } else {
          this.isDataAvailable = false;
          this._loadingService.loadingChanges.emit(false);
        }
      },
      error => {
        this.isDataAvailable = false;
        this._loadingService.loadingChanges.emit(false);
      });
  }

  deleteStar(celebrityId, celebrityName) {
    if (confirm('Are you sure you wish to delete ' + celebrityName + ' ? Remeber, this operation cannot be reversed.')) {
      this._userService.deleteCelebrity(celebrityId).then((value) => {
        this.getAll();
        this._notificationsService.success('Star removed successfully!', '', {
          timeOut: 3000,
          clickToClose: true,
          clickIconToClose: true
        });
      });
    }
  }

  search(data) {
    if (data) {
      this.celebrities = this.celebrities.filter((celebrity) => {
        if (celebrity['name']) {
          return (celebrity['name'].toLowerCase().includes(data));
        } else {
          return (celebrity['emailAddress'].toLowerCase().includes(data));
        }
      });
    } else {
      this.celebrities = this.backupCelebrities;
    }
  }

}
