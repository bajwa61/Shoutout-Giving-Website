import {
  OrderService
} from 'src/_services/order.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
} from '@angular/router';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {CategoryService} from 'src/_services/category.service';

@Component({
  selector: 'app-transaction-successful',
  templateUrl: './transaction-successful.component.html',
  styleUrls: ['./transaction-successful.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class TransactionSuccessfulComponent implements OnInit {

  celebrity: any;
  categories: any = [];
  selectedItems: any = [];
  order: any;
  transaction: any;
  celebId: any;
  orderId: any;
  transactionId: any;
  mySelf: boolean;
  tdate: any;
  next = true;
  requestDetails = false;

  images = [
    'assets/client/assets/img/main-banner2.png',
    // 'assets/client/assets/img/cat-banner.jpg'
  ];
  img4 = '/assets/thankyou-customer-img/thankyouCustomer4.png';

  constructor(
    private _route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _celebrityService: CelebrityService,
    private _categoryService: CategoryService,
    private _orderService: OrderService,
  ) {

    this._loadingService.loadingChanges.emit(true);

    this._route.paramMap.subscribe(params => {
      this.transaction['id'] = params.get('id');
    });

    this.getAllCategories();

  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe(categories => {
      this.categories = [];
      categories.forEach(category => {
        const tempCategory = category.payload.doc.data();
        tempCategory['id'] = category.payload.doc.id;
        tempCategory['itemName'] = category.payload.doc.data()['name'];
        this.categories.push(tempCategory);
      });
      this._route.params.subscribe(params => {
        this.getTransaction(params['id']);
      });
    });
  }

  getTransaction(transactionId) {
    this._orderService.getTransaction(transactionId).subscribe(
      (fetchedTransaction) => {
        console.log(fetchedTransaction);
        this.transaction = fetchedTransaction;
        this.orderId = this.transaction['orderId'];
        this.transaction['id'] = transactionId;
        this.getOrder(this.transaction['orderId']);
      }
    );
  }

  getOrder(orderId) {
    this._orderService.getprocessingOrders(orderId).subscribe(
      (fetchedOrder) => {
        console.log(fetchedOrder);
        this.order = fetchedOrder;
        this.celebId = this.order['celebId'];
        this.order['id'] = orderId;
        this.mySelf = this.order['myself'];
        this.getCelebrity(this.order['celebId']);
      }
    );
  }

  getCelebrity(celebrityId) {

    this._celebrityService.getCelebrity(celebrityId).subscribe(
      (fetchedCelebrity) => {
        this.selectedItems = [];
        const celebrity = fetchedCelebrity;
        this.celebrity = celebrity;
        this.celebrity['id'] = celebrityId;
        this._loadingService.loadingChanges.emit(false);

        if (celebrity['categories']) {
          celebrity['categories'].forEach(element => {
            this.categories.forEach(category => {
              if (category['id'] === element) {
                this.selectedItems.push(category);
              }
            });
          });
        }
      });
  }

  nextSetting(status: boolean) {
    this.next = status;
  }

  requestDetailsSetting(status: boolean) {
    this.requestDetails = status;
  }

  ngOnInit(): void {}

}
