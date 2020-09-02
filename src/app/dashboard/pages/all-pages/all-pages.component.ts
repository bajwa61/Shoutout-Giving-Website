import {
  Component,
  OnInit
} from '@angular/core';
import {
  PageService
} from 'src/_services/page.service';
import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-all-pages',
  templateUrl: './all-pages.component.html',
  styleUrls: ['./all-pages.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class AllPagesComponent implements OnInit {

  pages = [];
  isDataAvailable: boolean;

  constructor(
    private _pageService: PageService,
    private _loadingService: LoadingService,
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.isDataAvailable = false;
    this.getAll();
  }

  getAll() {
    this._pageService.getAllPages().subscribe(value => {
      if (value.length > 0) {
        value.forEach(data => {
          const tempPage = data.payload.doc.data();
          tempPage['id'] = data.payload.doc.id;
          this.pages.push(tempPage);
        });
        this.isDataAvailable = true;
        this._loadingService.loadingChanges.emit(false);
      } else {
        this.isDataAvailable = false;
        this._loadingService.loadingChanges.emit(false);
      }
    }, err => {
      this.isDataAvailable = false;
      this._loadingService.loadingChanges.emit(false);
    });
  }

  ngOnInit() {}

}