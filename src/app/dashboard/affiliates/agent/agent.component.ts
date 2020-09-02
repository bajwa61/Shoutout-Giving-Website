import {
  Component,
  OnInit
} from '@angular/core';
import {
  AgentService
} from 'src/_services/agent.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  NotificationsService
} from 'angular2-notifications';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class AgentComponent implements OnInit {

  agents = [];
  searchText: any;
  allAgents: boolean;

  constructor(
    private _agentService: AgentService,
    private _loadingService: LoadingService,
    private _notificationsService: NotificationsService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.allAgents = false;
    this.getAllAgents();
  }

  ngOnInit() {}

  getAllAgents() {
    this._loadingService.loadingChanges.emit(true);
    this.agents = [];
    this._agentService.getAllAgents().subscribe(value => {
      if (value.length > 0) {
        value.forEach(data => {
          const tempPage = data.payload.doc.data();
          tempPage['id'] = data.payload.doc.id;
          this.agents.push(tempPage);
          this.allAgents = true;
          this._loadingService.loadingChanges.emit(false);
        });
      } else {
        this.allAgents = false;
        this._loadingService.loadingChanges.emit(false);
      }
    }, err => {
      this.allAgents = false;
      this._loadingService.loadingChanges.emit(false);
    });
  }

  deleteAgent(id: any, name: any) {
    if (confirm('Are you sure you wish to delete ' + name + ' ? Remeber, this operation cannot be reversed.')) {
      this._agentService.deleteAgent(id).then((value) => {
        this.getAllAgents();
        this._notificationsService.success('Agent removed successfully!', '', {
          timeOut: 3000,
          clickToClose: true,
          clickIconToClose: true
        });
      });
    }
  }
}
