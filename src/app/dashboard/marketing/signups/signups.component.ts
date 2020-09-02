import {
  Component,
  OnInit
} from '@angular/core';
import {
  OrderService
} from 'src/_services/order.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  SubscribeService
} from 'src/_services/subscribe.service';

@Component({
  selector: 'app-signups',
  templateUrl: './signups.component.html',
  styleUrls: ['./signups.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class MarketingSignupsComponent implements OnInit {

  data: any;
  isDataAvailable = false;

  constructor(
    private _subscribeService: SubscribeService,
    private _loadingService: LoadingService,
  ) {
    this.getAll();
  }

  ngOnInit() {}

  getAll() {
    this._loadingService.loadingChanges.emit(true);
    this._subscribeService.getAllMarketingSignups().subscribe((signups) => {
      this.isDataAvailable = true;
      this.data = signups;
      this._loadingService.loadingChanges.emit(false);
    }, err => {
      this.isDataAvailable = false;
      this._loadingService.loadingChanges.emit(false);
    });
  }

}
