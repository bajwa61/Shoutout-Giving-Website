import { PageService } from './../../../_services/page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private _pageService:PageService) {
  }

  aboutData = {};
  ngOnInit(): void {
    this._pageService.getPageByType('about').subscribe(value => {
      this.aboutData = value[0].payload.doc.data();
    })

  }

}
