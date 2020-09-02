import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou-customer.component.html',
  styleUrls: ['./thankyou-customer.component.css']
})
export class ThankyouCustomerComponent implements OnInit {

  images = [
    'assets/client/assets/img/main-banner2.png',
    // 'assets/client/assets/img/cat-banner.jpg'
  ];
  img4 = '/assets/thankyou-customer-img/thankyouCustomer4.png';
  next = true;
  requestDetails = false;
  constructor() {}


  nextSetting(status: boolean) {
    this.next = status;
  }

  requestDetailsSetting(status: boolean) {
    this.requestDetails = status;
  }

  ngOnInit(): void {
  }

}
