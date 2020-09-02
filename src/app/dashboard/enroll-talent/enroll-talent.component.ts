
import {
  Component,
  OnInit
} from '@angular/core';
import {
  EnrollService
} from '../../../_services/enroll.service';
import {
  LoadingService
} from '../../../_services/loading.service';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-enroll-talent',
  templateUrl: './enroll-talent.component.html',
  styleUrls: ['./enroll-talent.component.css']
})


// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class EnrollTalentComponent implements OnInit {

  enrollRequests = [];
  enrollRequestsBackup = [];
  isDataAvailable: boolean;
  constructor(
    private _enrollService: EnrollService,
    private _loadingService: LoadingService,
    private _router: Router,
    private _notificationsService: NotificationsService,
   
  ) {
    this.isDataAvailable = false;
    this.getAll();
   
  }

  ngOnInit() {}

  getAll() {
    this._loadingService.loadingChanges.emit(true);
    this.enrollRequests = [];
    this.enrollRequestsBackup = [];
    this._enrollService.getAllRequest().subscribe((requests) => {
      if (requests.length > 0) {
        requests.forEach(celebrity => {
          // tslint:disable-next-line:prefer-const
          let enrollRequest = celebrity.payload.doc.data();
          enrollRequest['id'] = celebrity.payload.doc.id;
          this.enrollRequests.push(enrollRequest);
          this.enrollRequestsBackup.push(enrollRequest);
        });
        this.isDataAvailable = true;
        this._loadingService.loadingChanges.emit(false);
      } else {
        this.isDataAvailable = false;
        this._loadingService.loadingChanges.emit(false);
      }
    }, erroe => {
      this.isDataAvailable = false;
      this._loadingService.loadingChanges.emit(false);
    });
  }

  deleteRequest(requestId) {
    this._enrollService.deleteRequest(requestId).then((value) => {
      this.getAll();
      this._notificationsService.success('Enrol request has been revoked...', '', {
        timeOut: 3000,
        clickToClose: true,
        clickIconToClose: true
      });
    });
  }

  addUser(requestData) {
    // tslint:disable-next-line:object-literal-shorthand
    this._router.navigate(['/dashboard/new-star'], {
      state: {
        // tslint:disable-next-line:object-literal-shorthand
        requestData: requestData
      }
    });
  }

  search(data) {
    if (data) {
      this.enrollRequests = this.enrollRequests.filter((celebrity) => {
        return (celebrity['name'].toLowerCase().includes(data));
      });
    } else {
      this.enrollRequests = this.enrollRequestsBackup;
    }
  }

}
