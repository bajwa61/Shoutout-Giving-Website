import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  LanguageChangeService
} from 'src/_services/language-change.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';

@Component({
  selector: 'app-sticky-search',
  templateUrl: './sticky-search.component.html',
  styleUrls: ['./sticky-search.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class StickySearchComponent implements OnInit {

  currentRoute: any = '';
  langEng = true;
  celebrities: any;
  celebritiesSearch = [];
  searchFlag = false;

  constructor(
    private _router: Router,
    private _languageService: LanguageChangeService,
    private _celebrityService: CelebrityService,
  ) {
    this.currentRoute = this._router.url;
    this.getCelebrities();
  }

  ngOnInit(): void {

    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }
  }

  getCelebrities() {
    this.celebrities = [];
    this._celebrityService.getAllFeaturedCelebrities().subscribe((celebrity) => {
      this.celebrities = celebrity;
    });
  }

  searchData(data) {
    if (data) {
      this.celebritiesSearch = this.celebrities.filter((celebrity) => {
        if (celebrity['name']) {
          return (celebrity['name'].toLowerCase().includes(data.toLowerCase()));
        }
      });
    } else {
      this.celebritiesSearch = [];
    }
  }

  enableSearch() {
    this.searchFlag = !this.searchFlag;
    this.celebritiesSearch = [];
  }

}
