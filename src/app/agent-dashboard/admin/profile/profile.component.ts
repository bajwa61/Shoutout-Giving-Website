import {
  Component,
  OnInit
} from '@angular/core';
import {
  AgentService
} from 'src/_services/agent.service';
import { LoadingService } from 'src/_services/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

// tslint:disable: variable-name
export class ProfileComponent implements OnInit {
  constructor(private _agentService: AgentService,
              private _loadingService: LoadingService) {
      this._loadingService.loadingChanges.emit(true);
      this.getAgent();
  }

  agentProfile = {
    email: null,
    firstname: null,
    lastname: null,
    code: null,
    phone: null,
    refLink: null,
    bankName: null,
    account: null,
    iBAN: null,
    swiftCode: null,
  };
  ngOnInit() {}

  getAgent() {
    this._agentService
      .getAgent(localStorage.getItem('token'))
      .subscribe((fetchedAgent: any) => {
        this.agentProfile = fetchedAgent;
        this._loadingService.loadingChanges.emit(false);
      });
  }
}
