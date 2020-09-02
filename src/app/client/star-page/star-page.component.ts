import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  CategoryService
} from 'src/_services/category.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  LanguageChangeService
} from 'src/_services/language-change.service';

@Component({
  selector: 'app-star',
  templateUrl: './star-page.component.html',
  styleUrls: ['./star-page.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
// tslint:disable:no-shadowed-variable
export class StarPageComponent implements OnInit {

  langEng = true;
  celebrity: any = {
    videoUrl: ''
  };
  categories = [];
  selectedItems = [];
  celebrities: any;
  comingSoon = false;
  id: string;
  deliveries = [];
  deliveriesFlag = false;
  playButton = true;
  featuredCeleb = false;
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChildren('videoPublic') videopublic: QueryList < 'videoPublic' > ;
  videoPlayers: any = [];

  images = [];
  currentRate = 4.5;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _celebrityService: CelebrityService,
    private _categoryService: CategoryService,
    private _languageService: LanguageChangeService
  ) {
    this.getCelebrities();
    this.getAllCategories();
  }

  getAllCategories() {

    // this._loadingService.loadingChanges.emit(true);

    this._categoryService.getAllCategories().subscribe(categories => {
      this.categories = [];
      categories.forEach(category => {
        const tempCategory = Object.assign({}, category.payload.doc.data());
        tempCategory['id'] = category.payload.doc.id;
        tempCategory['itemName'] = category.payload.doc.data()['name'];
        this.categories.push(tempCategory);
      });
      this._route.params.subscribe(params => {
        if (params['id'] === 'MickMorrone') {
          this.featuredCeleb = true;
        }
        this.getCelebrity(params['id']);
      });
    });

  }

  getCelebrities() {

    this.celebrities = [];
    this._celebrityService.getAllFilteredCelebrities(5, 0).subscribe((celebrity) => {
      this.celebrities = celebrity;
    });

  }

  getCelebrity(id) {
    this._celebrityService.getCelebrityByUserName(id).subscribe((fetchedCelebrity) => {
      this.selectedItems = [];
      this.celebrity = {
        videoUrl: ''
      };

      if (fetchedCelebrity) {
        const celebrity = fetchedCelebrity[0].payload.doc.data();
        this.celebrity = celebrity;

        if (this.celebrity.videoUrl === undefined || this.celebrity.videoUrl === '') {
          this.comingSoon = true;
        } else {
          this.comingSoon = false;
          this.playButton = true;
        }

        this.getDeliveries(celebrity['id']);

        if (celebrity['categories']) {
          celebrity['categories'].forEach(element => {
            this.categories.forEach(category => {
              if (category['id'] === element) {
                this.selectedItems.push(category);
              }
            });
          });
        }
      }
      // this._loadingService.loadingChanges.emit(false);

    }, err => {
      console.log(err);
      // this._loadingService.loadingChanges.emit(false);
    });

  }

  getDeliveries(id) {
    this._celebrityService.getDeliveriesByCelebrityId(id).subscribe(value => {
      this.deliveries = [];
      if (value.length) {
        this.deliveriesFlag = true;
        value.forEach((delivery, index) => {
          this.deliveries.push(delivery.payload.doc.data());
          this.deliveries[index].playButton = true;
        });
      }
    });

  }

  toggleIntroVideo() {

    this.videoPlayers = this.videopublic.toArray();

    if (this.videoplayer.nativeElement.paused) {
      this.videoplayer.nativeElement.play();
      this.videoPlayers.forEach((element, index) => {
        this.videoPlayers[index].nativeElement.pause();
        this.deliveries[index].playButton = true;
      });
    } else {
      this.videoplayer.nativeElement.pause();
    }

    this.playButton = !this.playButton;
  }

  togglePublicVideo(index) {

    this.videoPlayers = this.videopublic.toArray();

    // tslint:disable-next-line:prefer-const
    let videoPromise = new Promise((resolve, reject) => {
      this.videoPlayers.forEach((value, eindex, array) => {
        if (eindex !== index) {
          this.videoPlayers[eindex].nativeElement.pause();
          this.deliveries[eindex].playButton = true;
        }
        if (eindex === array.length - 1) {
          resolve(this.videoPlayers);
        }
      });
    });

    videoPromise.then(value => {
      if (this.videoPlayers[index].nativeElement.paused) {
        this.videoPlayers[index].nativeElement.play();
        this.videoplayer.nativeElement.pause();
        this.playButton = true;
      } else {
        this.videoPlayers[index].nativeElement.pause();
      }

      this.deliveries[index].playButton = !this.deliveries[index].playButton;
    });

  }

  navigateUser(username) {
    this._router.navigate(['/star/' + username]);
  }

  ngOnInit(): void {
    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }

  }

}
