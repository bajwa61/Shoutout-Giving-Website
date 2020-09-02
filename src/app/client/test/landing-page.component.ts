import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  PageService
} from 'src/_services/page.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  CategoryService
} from 'src/_services/category.service';
import {
  SlickCarouselComponent
} from 'ngx-slick-carousel';
import {
  LanguageChangeService
} from 'src/_services/language-change.service';
import {
  StateService
} from 'src/_services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
// tslint:disable:no-shadowed-variable
// tslint:disable:max-line-length
export class TestLandingPageComponent implements OnInit {
  title = 'halahi';
  langEng = true;
  pageData = {};
  limitedCelebrities: any;
  lastCelebrityName: any;
  celebrities = [];
  backUpCelebrities = [];
  categories = [];
  loadpage = false;
  categoriesStar = {};
  celebritiesSearch = [];
  searchFlag = false;
  currentRate = 4.5;
  limit = 25;
  methodBlocked: boolean;
  images = ['assets/client/assets/img/banners/category-banner.png'];
  leftAdvert =
    'https://firebasestorage.googleapis.com/v0/b/halahi-7cc6d.appspot.com/o/pages%2Fadvertisements%2Fhome%2F1588845856329?alt=media&token=01e357d5-4ac7-4ed9-997e-4ba5e9331d93';
  rightAdvert =
    'https://firebasestorage.googleapis.com/v0/b/halahi-7cc6d.appspot.com/o/pages%2Fadvertisements%2Fhome%2F1588845856329?alt=media&token=01e357d5-4ac7-4ed9-997e-4ba5e9331d93';
  leftAdvertUrl = 'https://www.instagram.com/halahiofficial/';
  rightAdvertUrl = 'https://www.facebook.com/halahiofficial/';

  @ViewChild('slickModal') slickModal: SlickCarouselComponent;

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: false,
    nextArrow: false,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };

  constructor(
    private _router: Router,
    private _pageService: PageService,
    private _loadingService: LoadingService,
    private _celebrityService: CelebrityService,
    private _categoryService: CategoryService,
    private _languageService: LanguageChangeService,
    private _stateService: StateService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this._categoryService.getAllCategories().subscribe((categories) => {
      this.categories = [];
      categories.forEach((category) => {
        const tempCategory = category.payload.doc.data();
        tempCategory['id'] = category.payload.doc.id;
        this.categories.push(tempCategory);
        this.categoriesStar[tempCategory['id']] = [];
      });
    });
    this.methodBlocked = false;
    this.limit = 25;
    this.lastCelebrityName = '';
    this.getMoreCelebrities();
  }

  ngOnInit(): void {
    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }
    this._languageService.get('lang');
    this._pageService.getPageByType('home').subscribe((value) => {
      this.pageData = value[0].payload.doc.data();
      this.images = this.pageData['banners'];
      this.leftAdvert = this.pageData['leftAdvert'];
      this.rightAdvert = this.pageData['rightAdvert'];
      this.leftAdvertUrl = this.pageData['leftAdvertUrl'];
      this.rightAdvertUrl = this.pageData['rightAdvertUrl'];
    });
  }

  getMoreCelebrities() {
    if (!this.methodBlocked) {
      this._loadingService.loadingChanges.emit(true);
      this._celebrityService
        .getMoreCelebrities(this.limit, this.lastCelebrityName)
        .subscribe((value) => {
            console.log(value);
            this.limitedCelebrities = value;
            if (this.limitedCelebrities.length > 0) {
              this.limitedCelebrities.forEach((celebrity: any) => {
                this.celebrities.push(celebrity);
                this.backUpCelebrities.push(celebrity);
              });
              this.limit = 20;
              this.lastCelebrityName = this.limitedCelebrities[
                this.limitedCelebrities.length - 1
              ].fullName;
              console.log(this.lastCelebrityName);
              console.log(this.celebrities.length);
              this._loadingService.loadingChanges.emit(false);
            } else {
              this.methodBlocked = true;
              this._loadingService.loadingChanges.emit(false);
            }
          },
          (error: any) => {
            this.methodBlocked = true;
            this._loadingService.loadingChanges.emit(false);
          }
        );
    }
  }

  searchData(data) {
    if (data) {
      this.celebritiesSearch = this.celebrities.filter((celebrity) => {
        if (celebrity['name']) {
          return celebrity['name'].toLowerCase().includes(data.toLowerCase());
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

  navigateUser(username, vidUrl) {
    // if (vidUrl !== undefined && vidUrl !== '') {
    this._router.navigate(['/star/' + username]);
    // }
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

}
