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
  DashboardService
} from 'src/_services/dashboard.service';
import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-agent-dash-board',
  templateUrl: './agent-dash-board.component.html',
  styleUrls: ['./agent-dash-board.component.css'],
})

// tslint:disable:variable-name
export class AgentDashBoardComponent implements OnInit {
  constructor(
    private _conversionsService: ConversionsService,
    private _dashboardService: DashboardService,
    private _loadingService: LoadingService,
    private _agentService: AgentService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.totalconversions = false;
    const startMonth = new Date();
    startMonth.setDate(startMonth.getDate() - 30);
    startMonth.setHours(0);
    startMonth.setMinutes(0);
    startMonth.setSeconds(0);

    const end = new Date();
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    this.getMoneyGeneratedMonth(startMonth, end);
  }

  conversions = [];
  searchText: any;
  uniqueUrl: any;
  orders: any;
  moneyGeneratedMonth = 0;
  totalconversions: boolean;
  totalConversions = 0;
  ngOnInit() {}

  getRecentAgentConversions() {
    this._agentService
      .getAgent(localStorage.getItem('token'))
      .subscribe((fetchedAgent: any) => {
        this.uniqueUrl = fetchedAgent.refLink;
        this._conversionsService
          .getRecentAgentConversions(fetchedAgent.ref)
          .subscribe(
            (value) => {
              if (value.length > 0) {
                value.forEach((data) => {
                  const tempConversion = data.payload.doc.data();
                  // tslint:disable-next-line:no-string-literal
                  tempConversion['id'] = data.payload.doc.id;
                  this.conversions.push(tempConversion);
                });
                this._loadingService.loadingChanges.emit(false);
                this.totalconversions = true;
              } else {
                this.totalconversions = false;
                this._loadingService.loadingChanges.emit(false);
              }
            },
            (error: any) => {
              this.totalconversions = false;
              this._loadingService.loadingChanges.emit(false);
            }
          );
      });
  }

  getAllAgentConversions() {
    this._agentService
      .getAgent(localStorage.getItem('token'))
      .subscribe((fetchedAgent: any) => {
        this._conversionsService
          .getAllAgentConversions(fetchedAgent.ref)
          .subscribe(
            (value) => {
              if (value.length > 0) {
                this.totalConversions = value.length;
                this._loadingService.loadingChanges.emit(false);
                this.totalconversions = true;
              } else {
                this.totalconversions = false;
                this._loadingService.loadingChanges.emit(false);
              }
            },
            (error: any) => {
              this.totalconversions = false;
              this._loadingService.loadingChanges.emit(false);
            }
          );
      });
  }

  getMoneyGeneratedMonth(start, end) {
    this._agentService
      .getAgent(localStorage.getItem('token'))
      .subscribe((fetchedAgent: any) => {
        this._conversionsService.getAllAgentOrders(fetchedAgent.ref).subscribe(
          (orders) => {
            this.orders = orders;
            this.orders.forEach((element) => {
              this.moneyGeneratedMonth =
                this.moneyGeneratedMonth + element.price;
            });
            this.getRecentAgentConversions();
            this.getAllAgentConversions();
          },
          (error: any) => {
            this.moneyGeneratedMonth = 0;
            this.getRecentAgentConversions();
            this.getAllAgentConversions();
          }
        );
      });
  }

  copyMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}