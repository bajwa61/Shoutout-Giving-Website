import {
  Component,
  OnInit
} from '@angular/core';
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
  LanguageChangeService
} from 'src/_services/language-change.service';
declare var jQuery: any;

@Component({
  selector: 'app-category',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
// tslint:disable:deprecation
// tslint:disable:only-arrow-functions
// tslint:disable:no-shadowed-variable
export class CategoryPageComponent implements OnInit {

  title = 'halahi';
  langEng = true;
  categories = [];
  categoriesStar = {};
  selectedCategory;
  celebrities = [];
  backUpCelebrities = [];
  loadpage = false;
  currentRate = 3.5;

  images = [
    'assets/client/assets/img/banners/category-banner.png',
    // 'assets/client/assets/img/banners/categorypage-slim-banner.png',
  ];

  constructor(
    private _celebrityService: CelebrityService,
    private _loadingService: LoadingService,
    private _categoryService: CategoryService,
    private _languageService: LanguageChangeService,
  ) {

    this._loadingService.loadingChanges.emit(true);

    this._categoryService.getAllCategories().subscribe(categories => {
      this._loadingService.loadingChanges.emit(false);
      this.categories = [];
      let stateIndex = 0;

      categories.forEach((category, index) => {
        const tempCategory = category.payload.doc.data();
        tempCategory['id'] = category.payload.doc.id;
        this.categories.push(tempCategory);
        this.categoriesStar[tempCategory['id']] = [];
        if (history.state.data === category.payload.doc.data()['name']) {
          stateIndex = index;
        }
      });

      if (history.state.data) {
        this.selectedCategory = this.categories[stateIndex];
      } else {
        this.selectedCategory = this.categories[stateIndex];
      }

    });

    this._celebrityService.getAllCelebrities().subscribe((celebrity) => {
      this.celebrities = [];
      this.backUpCelebrities = [];

      // tslint:disable-next-line:no-shadowed-variable
      celebrity.forEach(celebrity => {
        const singleCelebrity = celebrity.payload.doc.data();
        singleCelebrity['id'] = celebrity.payload.doc.id;
        if (singleCelebrity['categories']) {
          singleCelebrity['categories'].forEach(categoryId => {
            const categoryIndex = this.categories.findIndex(singleCategory => {
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

  categoryTap(category) {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
  }

  searchData(data) {
    if (data) {
      this.celebrities = this.backUpCelebrities.filter((celebrity) => {
        return (celebrity['fullName'].toLowerCase().includes(data));
      });
    } else {
      this.celebrities = this.backUpCelebrities;
    }
  }

  ngOnInit(): void {

    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }

    (function($) {
      $(document).scroll(function() {

        const stickyNavTop = $('.category-info').offset().top;
        const scrollTop = $(this).scrollTop();

        const stickyNav = function() {
          if (scrollTop > 800) {
            $('#cat_div').addClass('container-fluid sticky-cat');
          } else {
            $('#cat_div').removeClass('container-fluid sticky-cat');
          }
        };

        $(window).resize(function() {
          stickyNav();
        });

        stickyNav();

      });
    })(jQuery);

  }

}
