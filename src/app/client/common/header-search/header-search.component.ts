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
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class HeaderSearchComponent implements OnInit {

  currentRoute: any = '';
  langEng = true;
  celebrities = [];
  celebritiesSearch = [];

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
    this._celebrityService.getAllCelebrities().subscribe((celebrity) => {
      // this._celebrityService.getRegisteredCelebrities().subscribe((celebrity) => {
      this.celebrities = [];

      // tslint:disable-next-line:no-shadowed-variable
      celebrity.forEach(celebrity => {
        const singleCelebrity = celebrity.payload.doc.data();
        singleCelebrity['id'] = celebrity.payload.doc.id;
        this.celebrities.push(singleCelebrity);
      });
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

}
