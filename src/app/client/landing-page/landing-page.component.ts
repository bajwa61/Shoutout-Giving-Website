import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
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
import {

  from
} from 'rxjs';
import { SignupDialogComponent } from './../common/signup-dialog/signup-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
// tslint:disable:no-shadowed-variable
// tslint:disable:max-line-length
export class LandingPageComponent implements OnInit {

  title = 'halahi';
  langEng = true;
  islogin = false;
  pageData = {};
  celebrities: any;
  backUpCelebrities: any;
  categories = [];
  loadpage = false;
  categoriesStar = {};
  celebritiesSearch = [];
  searchFlag = false;
  currentRate = 4.5;
  featuredBannerMobile = 'https://firebasestorage.googleapis.com/v0/b/halahi-7cc6d.appspot.com/o/homePageBanners%2Fbanner_massimo_mobile.jpg?alt=media&token=fd1ce51e-eec8-4963-a522-6d8b1e329e1e';
  featuredBanner = 'https://firebasestorage.googleapis.com/v0/b/halahi-7cc6d.appspot.com/o/homePageBanners%2Fbanner_massimo.jpg?alt=media&token=bf53e62f-d477-40ba-a02b-c86e6093aa8d';
  images = [
    'https://firebasestorage.googleapis.com/v0/b/halahi-7cc6d.appspot.com/o/pages%2Fbanners%2Fhome%2F1594110694463?alt=media&token=624bdc17-6f66-4ce3-8150-4ec7026b90eb'
  ];
  imagesMobile = [
    'assets/client/assets/img/banners/website_banner-artboard.jpg'
  ];
  leftAdvert = 'https://firebasestorage.googleapis.com/v0/b/halahi-7cc6d.appspot.com/o/pages%2Fadvertisements%2Fhome%2F1588845856329?alt=media&token=01e357d5-4ac7-4ed9-997e-4ba5e9331d93';
  rightAdvert = 'https://firebasestorage.googleapis.com/v0/b/halahi-7cc6d.appspot.com/o/pages%2Fadvertisements%2Fhome%2F1588845856329?alt=media&token=01e357d5-4ac7-4ed9-997e-4ba5e9331d93';
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
        dots: false
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      }
    }
    ]
  };

  constructor(
    private _router: Router,
    private _pageService: PageService,
    private _loadingService: LoadingService,
    private _celebrityService: CelebrityService,
    private _categoryService: CategoryService,
    private _languageService: LanguageChangeService,
    private _stateService: StateService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this._loadingService.loadingChanges.emit(true);

    this.getCelebrities();
  }

  ngOnInit(): void {

    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }
    this.islogin = this._stateService.getIsLogin();
    this._languageService.get('lang');
    this._pageService.getPageByType('home').subscribe(value => {
      this.pageData = value[0].payload.doc.data();
      this.images = this.pageData['banners'];
      this.imagesMobile = this.pageData['bannersMobile'];
      this.leftAdvert = this.pageData['leftAdvert'];
      this.rightAdvert = this.pageData['rightAdvert'];
      this.leftAdvertUrl = this.pageData['leftAdvertUrl'];
      this.rightAdvertUrl = this.pageData['rightAdvertUrl'];
    });
  }

  getCelebrities() {
    this.celebrities = [];
    this.backUpCelebrities = [];
    this._celebrityService.getAllFeaturedCelebrities().subscribe((celebrity) => {
      this.celebrities = celebrity;
      this.backUpCelebrities = celebrity;
      this._loadingService.loadingChanges.emit(false);
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

  navigateUser(username, vidUrl) {
    // if (vidUrl !== undefined && vidUrl !== '') {

    this._stateService.getIsLogin() ? this._router.navigate(['/star/' + username]) : "";
    // }
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
