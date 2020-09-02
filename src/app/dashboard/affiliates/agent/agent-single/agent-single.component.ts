import {
  Component,
  OnInit
} from '@angular/core';
import {
  AgentService
} from 'src/_services/agent.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  ConversionsService
} from 'src/_services/conversions.service';
import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-agent-single',
  templateUrl: './agent-single.component.html',
  styleUrls: ['./agent-single.component.css'],
})
export class AgentSingleComponent implements OnInit {

  agent = {
    firstname: '',
    lastname: '',
    email: '',
    code: '',
    phoneNumber: '',
    termsAgreement: '',
    ref: '',
  };
  conversions = [];
  searchText: any;
  allConversions: boolean;

  // tslint:disable:variable-name
  // tslint:disable:no-string-literal
  constructor(
    private _agentService: AgentService,
    private _route: ActivatedRoute,
    private _conversionsService: ConversionsService,
    private _loadingService: LoadingService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.allConversions = false;
    this.getAgent();
  }

  ngOnInit(): void {}

  getAgent() {
    this._route.params.subscribe((params) => {
      this._agentService.getAgent(params.id).subscribe((fetchedAgent: any) => {
        this.agent = fetchedAgent;
        this.getAllAgentConversions(fetchedAgent.ref);
      }, error => {
        this._loadingService.loadingChanges.emit(false);
      });
    }, error => {
      this._loadingService.loadingChanges.emit(false);
    });
  }

  getAllAgentConversions(ref: any) {
    this._conversionsService.getAllAgentConversions(ref).subscribe((value) => {
      if (value.length > 0) {
        value.forEach((data) => {
          const tempPage = data.payload.doc.data();
          tempPage['id'] = data.payload.doc.id;
          this.conversions.push(tempPage);
        });
        this.allConversions = true;
        this._loadingService.loadingChanges.emit(false);
      } else {
        this.allConversions = false;
        this._loadingService.loadingChanges.emit(false);
      }
    }, error => {
      this.allConversions = false;
      this._loadingService.loadingChanges.emit(false);
    });
  }
}
