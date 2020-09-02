import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  CategoryService
} from 'src/_services/category.service';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  FileService
} from 'src/_services/file.service';
import {
  getAllLifecycleHooks
} from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
// tslint:disable:prefer-const
export class CategoriesComponent implements OnInit {

  categories = [];
  id;
  imageFileUrl;
  selectedFile;
  isDataAvailable: boolean;
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    arabicName: new FormControl('', [Validators.required]),
    imageFile: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _categoryService: CategoryService,
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService,
    private _fileService: FileService
  ) {
    this.isDataAvailable = false;
    this.getAll();
  }

  getAll() {
    this._loadingService.loadingChanges.emit(true);
    this._categoryService.getAllCategories().subscribe(categories => {
      this.categories = [];
      if (categories.length > 0) {
        categories.forEach(category => {
          let tempCategory = category.payload.doc.data();
          tempCategory['id'] = category.payload.doc.id;
          this.categories.push(tempCategory);
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

  initForm() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      arabicName: new FormControl('', [Validators.required]),
      imageFile: new FormControl(null, [Validators.required]),
    });
  }

  addCategory() {
    // tslint:disable-next-line:max-line-length
    if (!(this.categoryForm.controls['name'].valid && this.categoryForm.controls['arabicName'].valid && (this.categoryForm.controls['imageFile'].valid || this.imageFileUrl))) {
      // tslint:disable-next-line:forin
      for (const property in this.categoryForm.getRawValue()) {
        this.categoryForm.controls[property].markAsTouched();
      }
    } else {
      this._loadingService.loadingChanges.emit(true);
      this.uploadFile();
    }
  }

  deleteCategory(categoryId) {
    this._categoryService.deleteCategory(categoryId).then(value => {
      this._notificationsService.success('Item deleted!', '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        clickIconToClose: true
      });
    });
  }

  editCategory(category) {
    this.id = category['id'];
    this.imageFileUrl = category['imageUrl'];
    this.categoryForm.controls['name'].setValue(category['name']);
    this.categoryForm.controls['arabicName'].setValue(category['arabicName']);
  }

  uploadFile() {
    if (this.selectedFile) {
      this._fileService.pushUploadToDatabase(this.selectedFile, (data) => {
        console.log(data);
        this.imageFileUrl = data.url;
        console.log(this.imageFileUrl);
        this.writeData();
      });
    } else {
      this.writeData();
    }
  }

  changeFile(files) {
    this.selectedFile = files[0];
  }

  writeData() {
    let category = {
      name: this.categoryForm.getRawValue()['name'],
      arabicName: this.categoryForm.getRawValue()['arabicName'],
      imageUrl: this.imageFileUrl
    };
    if (this.id) {
      this._categoryService.updateCategory(category, this.id).then(value => {
        this._loadingService.loadingChanges.emit(false);
        this.initForm();
        this.id = null;
        this._notificationsService.success('Category updated!', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });

      });
    } else {
      this._categoryService.createCategory(category).then(value => {
        this._loadingService.loadingChanges.emit(false);
        this.initForm();
        this._notificationsService.success('Category created!', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          clickIconToClose: true
        });

      });
    }
  }

  ngOnInit() {}

}