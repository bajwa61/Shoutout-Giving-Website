import {
  Component,
  OnInit
} from '@angular/core';
import {
  ConversionsService
} from 'src/_services/conversions.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  AgentService
} from 'src/_services/agent.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

// tslint:disable:variable-name
export class OrdersComponent implements OnInit {

  orders: any;
  totalOrders: boolean;

  constructor(
    private _conversionsService: ConversionsService,
    private _loadingService: LoadingService,
    private _agentService: AgentService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.totalOrders = false;
    this.getAllAgentDeliveredOrders();
  }

  ngOnInit() {}

  getAllAgentDeliveredOrders() {
    this._agentService.getAgent(localStorage.getItem('token')).subscribe(
      (fetchedAgent: any) => {
        this._conversionsService.getAllAgentOrders(fetchedAgent.ref).subscribe((orders: any) => {
            if (orders.length > 0) {
              this.orders = orders;
              this.totalOrders = true;
              this._loadingService.loadingChanges.emit(false);
            } else {
              this.totalOrders = false;
              this._loadingService.loadingChanges.emit(false);
            }
          },
          (error: any) => {
            this.totalOrders = false;
            this._loadingService.loadingChanges.emit(false);
          });
      });
  }

}
