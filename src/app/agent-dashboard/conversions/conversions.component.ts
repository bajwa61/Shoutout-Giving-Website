import {
  Component,
  OnInit
} from '@angular/core';
import {
  ConversionsService
} from 'src/_services/conversions.service';
import {
  AgentService
} from 'src/_services/agent.service';
import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css'],
})

// tslint:disable: variable-name
export class ConversionsComponent implements OnInit {
  conversions = [];
  searchText: any;
  totalConversions: boolean;


  constructor(
    private _conversionsService: ConversionsService,
    private _loadingService: LoadingService,
    private _agentService: AgentService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.totalConversions = false;
    this.getAllAgentConversions();
  }

  ngOnInit() {}

  getAllAgentConversions() {
    this._agentService
      .getAgent(localStorage.getItem('token'))
      .subscribe((fetchedAgent: any) => {
        this._conversionsService
          .getAllAgentConversions(fetchedAgent.ref)
          .subscribe(
            (value) => {
              if (value.length > 0) {
                value.forEach((data) => {
                  const tempPage = data.payload.doc.data();
                  // tslint:disable-next-line:no-string-literal
                  tempPage['id'] = data.payload.doc.id;
                  this.conversions.push(tempPage);
                });
                this.totalConversions = true;
                this._loadingService.loadingChanges.emit(false);

              } else {
                this.totalConversions = false;
                this._loadingService.loadingChanges.emit(false);
              }
            },
            (error: any) => {
              this.totalConversions = false;
              this._loadingService.loadingChanges.emit(false);
            }
          );
      });
  }
}
