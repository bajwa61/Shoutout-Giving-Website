import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  ConversionsService
} from 'src/_services/conversions.service';

@Component({
  selector: 'app-conversions-details',
  templateUrl: './conversions-details.component.html',
  styleUrls: ['./conversions-details.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-shadowed-variable
export class ConversionsDetailsComponent implements OnInit {

  celebrity = {
    name: null,
    createdDate: null
  };
  orders = [];
  totalOrders: boolean;
  constructor(
    private _conversionsService: ConversionsService,
    private _celebrityService: CelebrityService,
    private _loadingService: LoadingService,
    private _route: ActivatedRoute
  ) {
    this._loadingService.loadingChanges.emit(true);
    this._route.params.subscribe(params => {
      this._conversionsService.getConversionById(params.id);
      this.getCelebrity(params.id);
      this.getAllAgentConversions(params.id);
    });
  }


  ngOnInit(): void {}

  getCelebrity(id: string) {
    this._conversionsService.getConversionById(id).subscribe((res: any) => {
      this._celebrityService.getCelebrityByEmail(res.email.toLowerCase()).subscribe((fetchedCelebrity: any) => {
        this.celebrity = fetchedCelebrity[0];
        this._loadingService.loadingChanges.emit(false);
      }, error => {
        this._loadingService.loadingChanges.emit(false);
      });
    }, error => {
      this._loadingService.loadingChanges.emit(false);
    });
  }

  getAllAgentConversions(id) {
    this._conversionsService.getAllDeliveredOrdersByCelebrityId(id).subscribe((orders) => {
      this.orders = [];
      if (orders.length > 0) {
        orders.forEach(category => {
          const tempCategory = category.payload.doc.data();
          tempCategory.id = category.payload.doc.id;
          this.orders.push(tempCategory);
        });
        this.totalOrders = true;
        this._loadingService.loadingChanges.emit(false);
      } else {

        this.totalOrders = false;
        this._loadingService.loadingChanges.emit(false);
      }
    }, err => {
      this.totalOrders = false;
      this._loadingService.loadingChanges.emit(false);
    });
  }
}
