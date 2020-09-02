import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  EnrollService
} from 'src/_services/enroll.service';
import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-enroll-talent-list',
  templateUrl: './enroll-talent-list.component.html',
  styleUrls: ['./enroll-talent-list.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class EnrollTalentComponent implements OnInit {

  searchText: any;
  enrollRequests = [];
  enrollRequestsBackup = [];

  constructor(
    private _enrollService: EnrollService,
    private _loadingService: LoadingService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) {
    this.getAll();
  }

  ngOnInit() {}

  getAll() {
    this._loadingService.loadingChanges.emit(true);
    this.enrollRequests = [];
    this.enrollRequestsBackup = [];
    this._enrollService.getAllRequest().subscribe((requests) => {
      requests.forEach(celebrity => {
        // tslint:disable-next-line:prefer-const
        let enrollRequest = celebrity.payload.doc.data();
        enrollRequest['id'] = celebrity.payload.doc.id;
        this.enrollRequests.push(enrollRequest);
        this.enrollRequestsBackup.push(enrollRequest);
      });
      this._loadingService.loadingChanges.emit(false);
    });
  }

  deleteRequest(requestId, requestName) {
    if (confirm('Are you sure you wish to delete ' + requestName + '\'s request? Remember, this operation cannot be reversed.')) {
      this._enrollService.deleteRequest(requestId).then((value) => {
        this.getAll();
        this._notificationsService.success('Enrol request has been revoked...', '', {
          timeOut: 3000,
          clickToClose: true,
          clickIconToClose: true
        });
      });
    }
  }

  addUser(requestData) {
    // tslint:disable-next-line:object-literal-shorthand
    this._router.navigate(['/dashboard/new-star'], { state: {requestData: requestData}});
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
