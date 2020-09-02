import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {NotificationsService} from 'angular2-notifications';
import {PageService} from 'src/_services/page.service';
import {CelebrityService} from 'src/_services/celebrity.service';
import {UploadvideoService} from 'src/_services/uploadvideo.service';

@Component({
  selector: 'app-add-new-page',
  templateUrl: './add-new-page.component.html',
  styleUrls: ['./add-new-page.component.css']
})

export class AddNewPageComponent implements OnInit {

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  pageDetail = 'enroll';
  title = '';
  content = '';
  arabicTitle = '';
  arabicContent = '';
  pageId;

  // faq
  faq = [{
    question: 'test',
    answer: 'test'
  }];
  faqArabic = [{
    question: 'atest',
    answer: 'atest'
  }];

  // enrol
  bannerTitle = '';
  companyTitle = '';
  companySubtitle = '';
  featuredStars = [];
  featuredBanners = [];
  celebrities = [];

  // home
  banners = [];
  leftAdvert = [];
  rightAdvert = [];
  leftAdvertUrl: any = '';
  rightAdvertUrl: any = '';
  fileToUploadimg: File = null;
  bannerBytesTransferred: any = 0;
  bannerTotalBytes: any = 0;
  // imageUploadPercentage: Observable < number > ;
  // imageUploadSnapshot: Observable < any > ;

  // tslint:disable:variable-name
  // tslint:disable:no-string-literal
  constructor(
    private _router: Router,
    private _pageService: PageService,
    private _route: ActivatedRoute,
    private _celebrityService: CelebrityService,
    private _notificationsService: NotificationsService,
    public _uploadvideoService: UploadvideoService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.pageId = params['id'];
      this.getPage();
    });
    this._celebrityService.getAllCelebrities().subscribe((celebrity) => {
      this.celebrities = [];
      // tslint:disable-next-line:no-shadowed-variable
      celebrity.forEach(celebrity => {
        // tslint:disable-next-line:prefer-const
        let singleCelebrity = celebrity.payload.doc.data();
        singleCelebrity['id'] = celebrity.payload.doc.id;
        this.celebrities.push(singleCelebrity);
      });
    });
  }

  getPage() {
    this._pageService.getPage(this.pageId).subscribe(value => {
      this.pageDetail = value.payload.data()['type'];
      this.getPageData(value.payload.data());
    });
  }

  getPageData(pageData) {
    switch (this.pageDetail) {
      case 'enroll':
        this.getDefaultData(pageData);
        this.getEnrollData(pageData);
        break;
      case 'faq':
        this.getDefaultData(pageData);
        this.getFaqData(pageData);
        break;
      case 'home':
        this.getDefaultData(pageData);
        this.getHomeData(pageData);
        break;
      default:
        this.getDefaultData(pageData);
        break;
    }
  }

  updatePageData() {
    // tslint:disable-next-line:prefer-const
    let pageData = {
      title: this.title,
      content: this.content,
      arabicTitle: this.arabicTitle ? this.arabicTitle : '',
      arabicContent: this.arabicContent ? this.arabicContent : ''
    };

    switch (this.pageDetail) {
      case 'enroll':
        pageData['bannerTitle'] = this.bannerTitle;
        pageData['companyTitle'] = this.companyTitle;
        pageData['companySubtitle'] = this.companySubtitle;
        pageData['featuredStars'] = this.featuredStars != null ? this.featuredStars : [];
        this.updateData(pageData);
        break;
      case 'faq':
        pageData['faq'] = this.faq;
        pageData['faqArabic'] = this.faqArabic;
        this.updateData(pageData);
        break;
      case 'home':
        pageData['leftAdvertUrl'] = this.leftAdvertUrl;
        pageData['rightAdvertUrl'] = this.rightAdvertUrl;
        pageData['banners'] = this.banners != null ? this.banners : [];
        pageData['leftAdvert'] = this.leftAdvert != null ? this.leftAdvert : [];
        pageData['rightAdvert'] = this.rightAdvert != null ? this.rightAdvert : [];
        this.updateData(pageData);
        break;
      default:
        this.updateData(pageData);
        break;
    }
  }

  updateData(pageData) {

    this._pageService.updatePage(pageData, this.pageId).then(resp => {

      this._notificationsService.success('Page updated successfully!', '', {
        timeOut: 3000,
        clickToClose: true,
        clickIconToClose: true
      });
      this._router.navigate(['dashboard/all-pages']);

    });
  }

  // ------------------------------------ Default Page Functions
  getDefaultData(pageData) {
    this.title = pageData['title'];
    this.content = pageData['content'];
    this.arabicTitle = pageData['arabicTitle'];
    this.arabicContent = pageData['arabicContent'];
  }

  // ------------------------------------ Enrol Page Functions
  getEnrollData(pageData) {
    this.bannerTitle = pageData['bannerTitle'];
    this.companyTitle = pageData['companyTitle'];
    this.companySubtitle = pageData['companySubtitle'];
    this.featuredStars = pageData['featuredStars'] != null ? pageData['featuredStars'] : [];
  }

  addCelebrity(value) {
    if (value) {
      this.featuredStars.push(this.celebrities.filter(celebrity => celebrity.id === value)[0]);
    }
  }

  // ------------------------------------ FAQ Page Functions
  getFaqData(pageData) {
    this.faq = pageData['faq'] != null ? pageData['faq'] : this.faq;
    this.faqArabic = pageData['faqArabic'] != null ? pageData['faqArabic'] : this.faqArabic;
  }

  addArabicFaq() {
    this.faqArabic.push({
      question: '',
      answer: ''
    });
  }

  removeArabicFaq(index) {
    this.faqArabic.splice(index, 1);
  }

  addFaq() {
    this.faq.push({
      question: '',
      answer: ''
    });
  }

  removeFaq(index) {
    this.faq.splice(index, 1);
  }

  // ------------------------------------ HOME Page Functions
  getHomeData(pageData) {
    this.leftAdvertUrl = pageData['leftAdvertUrl'];
    this.rightAdvertUrl = pageData['rightAdvertUrl'];
    this.leftAdvert = pageData['leftAdvert'];
    this.rightAdvert = pageData['rightAdvert'];
    this.banners = pageData['banners'];
  }

  uploadHomeBanner(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `pages/banners/home/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`pages/banners/home/${n}`, file);
    this.bannerBytesTransferred = 0;
    this.bannerTotalBytes = 0;

    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this._notificationsService.success('Banner uploaded successfully...', '', {
                timeOut: 3000,
                clickToClose: true,
                clickIconToClose: true
              });
              this.addBanners(url);
            }
          });
        })
      ).subscribe(progressSnapshot => {
        if (progressSnapshot) {
          this.bannerBytesTransferred = progressSnapshot.bytesTransferred;
          this.bannerTotalBytes = progressSnapshot.totalBytes;
        }
      });
  }

  addBanners(value) {
    if (value) {
      this.banners.push(value);
    }
  }

  uploadAdvertisement(event, flag) {

    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `pages/advertisements/home/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`pages/advertisements/home/${n}`, file);

    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this._notificationsService.success('Advertisement uploaded successfully...', '', {
                timeOut: 3000,
                clickToClose: true,
                clickIconToClose: true
              });
              this.addAdvert(url, flag);
            }
          });
        })
      ).subscribe(progressSnapshot => {
        if (progressSnapshot) {
          console.log(progressSnapshot);
        }
      });

  }

  addAdvert(url, flag) {
    if (url) {
      if (flag === 'left') {
        this.leftAdvert = url;
      } else if (flag === 'right') {
        this.rightAdvert = url;
      }
    }
  }

}
