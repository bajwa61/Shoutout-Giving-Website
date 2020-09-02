import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  CategoryService
} from 'src/_services/category.service';

@Component({
  selector: 'app-star-single',
  templateUrl: './star-single.component.html',
  styleUrls: ['./star-single.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class StarSingleComponent implements OnInit {

  celebrity: any = {
    imageUrl: '',
  };
  categories = [];
  selectedItems = [];

  constructor(
    private _route: ActivatedRoute,
    private _celebrityService: CelebrityService,
    private _categoryService: CategoryService,
    private _loadingService: LoadingService
  ) {

    this._loadingService.loadingChanges.emit(true);

    this.getAllCategories();

  }

  getCelebrity(celebrityId) {
    this._celebrityService.getCelebrity(celebrityId).subscribe(
      (fetchedCelebrity) => {
        this.celebrity = {
          imageUrl: '',
        };
        this.selectedItems = [];
        this.celebrity = fetchedCelebrity;
        this.celebrity['id'] = celebrityId;
        if (fetchedCelebrity['categories']) {
          fetchedCelebrity['categories'].forEach(element => {
            this.categories.forEach(category => {
              if (category['id'] === element) {
                this.selectedItems.push(category);
              }
            });
          });
        }
        this.celebrity['id'] = celebrityId;
        this._loadingService.loadingChanges.emit(false);
      }
    );
  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe(categories => {
      this.categories = [];
      categories.forEach(category => {
        const tempCategory = category.payload.doc.data();
        tempCategory['id'] = category.payload.doc.id;
        tempCategory['itemName'] = category.payload.doc.data()['name'];
        this.categories.push(tempCategory);
      });
      this._route.params.subscribe(params => {
        this.getCelebrity(params['id']);
      });
    });
  }

  ngOnInit() {}

}
