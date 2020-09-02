import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../_services/page.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})

// tslint:disable:variable-name
export class FaqComponent implements OnInit {

  constructor(private _pageService: PageService) { }

  faqData = {};

  ngOnInit(): void {
    this._pageService.getPageByType('faq').subscribe(value => {
      this.faqData = value[0].payload.doc.data();
    });
  }

}
