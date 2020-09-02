import { PageService } from './../../../_services/page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {

  constructor(private _pageService: PageService) {
  }

  refundData = {};
  ngOnInit(): void {
    this._pageService.getPageByType('refund').subscribe(value => {
      this.refundData = value[0].payload.doc.data();
    })

  }

}
