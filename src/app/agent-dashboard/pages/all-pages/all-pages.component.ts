import {Component, OnInit} from '@angular/core';
import {PageService} from 'src/_services/page.service';

@Component({
  selector: 'app-all-pages',
  templateUrl: './all-pages.component.html',
  styleUrls: ['./all-pages.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class AllPagesComponent implements OnInit {

  pages = [];

  constructor(
    private _pageService: PageService
  ) {}

  ngOnInit() {
    this._pageService.getAllPages().subscribe(value => {
      value.forEach(data => {
        const tempPage = data.payload.doc.data();
        tempPage['id'] = data.payload.doc.id;
        this.pages.push(tempPage);
      });
    });

  }

}
