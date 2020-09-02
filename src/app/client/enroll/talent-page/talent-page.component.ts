import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/_services/page.service';
import { CelebrityService } from 'src/_services/celebrity.service';
import { LoadingService } from 'src/_services/loading.service';
import { CategoryService } from 'src/_services/category.service';
import {
  LanguageChangeService
} from 'src/_services/language-change.service';
import { StateService } from './../../../../_services/state.service';
@Component({
  selector: 'app-talent',
  templateUrl: './talent-page.component.html',
  styleUrls: ['./talent-page.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
// tslint:disable:no-shadowed-variable
// tslint:disable:prefer-const
export class TalentPageComponent implements OnInit {

  title = 'halahi';
  langEng = true;
  enrollData = {};
  celebrities = [];
  categories = [];
  categoriesStar = {};
  backUpCelebrities = [];
  celebritiesSearch = [];
  searchFlag = false;
  isLogin = false;

  images = [
    // 'assets/client/assets/img/main-banner2.png',
    'assets/client/assets/img/cat-banner.jpg'
  ];

  constructor(
    private _pageService: PageService,
    private _celebrityService: CelebrityService,
    private _loadingService: LoadingService,
    private _categoryService: CategoryService,
    private _languageService: LanguageChangeService,
    private _statService: StateService
  ) {
    this.getCelebrities();
  }

  ngOnInit(): void {
    // this._languageService.set('lang', 'arabic');
    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }
    this.isLogin = this._statService.getIsLogin();
    this._pageService.getPageByType('enroll').subscribe(value => {
      this.enrollData = value[0].payload.doc.data();
    });
    this.loadScript('../../../assets/client/assets/js/calculation.js');
  }

  getCelebrities() {

    this._loadingService.loadingChanges.emit(true);
    this._categoryService.getAllCategories().subscribe(categories => {
      this._loadingService.loadingChanges.emit(false);
      this.categories = [];
      categories.forEach(category => {
        const tempCategory = category.payload.doc.data();
        tempCategory['id'] = category.payload.doc.id;
        this.categories.push(tempCategory);
        this.categoriesStar[tempCategory['id']] = [];
      });
    });

    this._celebrityService.getAllCelebrities().subscribe((celebrity) => {
      this.celebrities = [];
      this.backUpCelebrities = [];
      celebrity.forEach(celebrity => {
        const singleCelebrity = celebrity.payload.doc.data();
        singleCelebrity['id'] = celebrity.payload.doc.id;
        if (singleCelebrity['categories']) {
          singleCelebrity['categories'].forEach(categoryId => {
            let categoryIndex = this.categories.findIndex(singleCategory => {
              return categoryId === singleCategory['id'];
            });
            if (!this.categories[categoryIndex]['stars']) {
              this.categories[categoryIndex]['stars'] = [];
            }
            this.categories[categoryIndex]['stars'].push(singleCelebrity);
          });
          this.celebrities.push(singleCelebrity);
          this.backUpCelebrities.push(singleCelebrity);
        }

      });
      this._loadingService.loadingChanges.emit(false);
    });
  }

  loadScript(url: string) {
    const body = document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  searchData(data) {
    if (data) {
      this.celebritiesSearch = this.backUpCelebrities.filter((celebrity) => {
        return (celebrity['fullName'].toLowerCase().includes(data));
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
