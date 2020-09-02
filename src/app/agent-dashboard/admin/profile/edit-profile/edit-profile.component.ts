import {
  Component,
  OnInit
} from '@angular/core';
import {
  AgentService
} from 'src/_services/agent.service';
import {
  HttpClient
} from '@angular/common/http';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  Observable
} from 'rxjs';
import {
  Router
} from '@angular/router';

import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

// tslint:disable: variable-name
// tslint:disable: member-ordering
export class EditProfileComponent implements OnInit {

  constructor(private _agentService: AgentService,
              private _http: HttpClient,
              private _notificationsService: NotificationsService,
              private _loadingService: LoadingService,
              private _router: Router) {
    this._loadingService.loadingChanges.emit(true);
    this.getAgent();
    this.getJSON().subscribe(data => {
      this.codesJson = data.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
  public getJSON(): Observable < any > {
    return this._http.get(this.jsonURL);
  }

  jsonURL = '../../../../assets/client/assets/data/countrycodes.json';
  codesJson = [];
  agentProfileModel = {
    firstname: null,
    lastname: null,
    code: '+93',
    phone: null,
    bankName: null,
    account: null,
    iBAN: null,
    swiftCode: null,
    email: null,
    refLink: null,
  };



  getAgent() {
    this._agentService
      .getAgent(localStorage.getItem('token'))
      .subscribe((fetchedAgent: any) => {
        this.agentProfileModel = fetchedAgent;
        this._loadingService.loadingChanges.emit(false);
      });
  }

  updateAgentProfile() {
    this._loadingService.loadingChanges.emit(true);

    this._agentService.updateById(this.agentProfileModel, localStorage.getItem('token')).then(resp => {
      this._notificationsService.success('Profile updated!', '', {
        timeOut: 3000,
        clickToClose: true,
        clickIconToClose: true
      });
      this._router.navigate(['agent-dashboard/profile']);
    });

  }

  ngOnInit() {}

}
