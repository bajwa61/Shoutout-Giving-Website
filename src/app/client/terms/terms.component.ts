import {Component, OnInit} from '@angular/core';
import {PageService} from 'src/_services/page.service';

@Component({
  selector: 'app-category',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})

// tslint:disable:variable-name
export class TermsComponent implements OnInit {

  constructor(
    private _pageService: PageService
  ) {}

  termsData = {};

  ngOnInit(): void {
    this._pageService.getPageByType('terms').subscribe(value => {
      this.termsData = value[0].payload.doc.data();
    });

  }

}
