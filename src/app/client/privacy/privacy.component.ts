import { PageService } from './../../../_services/page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(private _pageService:PageService) {
  }

  privacyData = {};
  ngOnInit(): void {
    this._pageService.getPageByType('privacy').subscribe(value => {
      this.privacyData = value[0].payload.doc.data();
    })

  }

}
