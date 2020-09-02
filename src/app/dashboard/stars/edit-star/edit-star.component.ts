import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  Observable
} from 'rxjs';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  CategoryService
} from 'src/_services/category.service';
import {
  AgentService
} from 'src/_services/agent.service';
import {
  UploadvideoService
} from 'src/_services/uploadvideo.service';
import {
  NgxImageCompressService
} from 'ngx-image-compress';

@Component({
  selector: 'app-edit-star',
  templateUrl: './edit-star.component.html',
  styleUrls: ['./edit-star.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class EditStarComponent implements OnInit {

  celebrity: any;
  categories = [];
  agents = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  activeStatus = false;
  bookableStatus = false;
  emailNotifications = false;
  pushNotifications = false;
  smsNotifications = false;
  featuredStatus = false;
  agentRef = null;
  responseTime = null;

  // Video upload variables
  fileToUpload: File = null;
  videoUploadPercentage: Observable < number > ;
  videoUploadSnapshot: Observable < any > ;

  fileToUploadimg: File = null;
  imageUploadPercentage: Observable < number > ;
  imageUploadSnapshot: Observable < any > ;
  defaultAgent = {
    email: 'None',
    ref: ''
  };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _celebrityService: CelebrityService,
    private _categoryService: CategoryService,
    private _agentService: AgentService,
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService,
    public _uploadvideoService: UploadvideoService,
    private imageCompress: NgxImageCompressService
  ) {
    this._loadingService.loadingChanges.emit(true);

    this.getAllCategories();
    this.getAllAgents();

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Categories',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  getCelebrity(celebrityId) {
    this._celebrityService.getCelebrity(celebrityId).subscribe((fetchedCelebrity) => {
      this.selectedItems = [];
      this.celebrity = {};
      this.celebrity = fetchedCelebrity;
      this.activeStatus = this.celebrity['active'];
      this.bookableStatus = this.celebrity['bookableStatus'];
      this.emailNotifications = this.celebrity['emailNotifications'];
      this.pushNotifications = this.celebrity['pushNotifications'];
      this.smsNotifications = this.celebrity['smsNotifications'];

      if (fetchedCelebrity['responseTime']) {
        this.responseTime = this.celebrity['responseTime'];
      } else {
        this.responseTime = 7;
      }

      if (fetchedCelebrity['ref']) {
        this.agentRef = this.celebrity['ref'];
      } else {
        this.agentRef = this.defaultAgent.ref;
      }

      if (fetchedCelebrity['featuredStatus']) {
        this.featuredStatus = this.celebrity['featuredStatus'];
      } else {
        this.featuredStatus = false;
      }

      if (fetchedCelebrity['videoUrl']) {
        this._uploadvideoService.downloadURLvid = this.celebrity['videoUrl'];
      } else {
        this._uploadvideoService.downloadURLvid = '';
      }

      if (fetchedCelebrity['imageUrl']) {
        this._uploadvideoService.downloadURLimg = this.celebrity['imageUrl'];
      } else {
        this._uploadvideoService.downloadURLimg = '';
      }

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

    });
  }

  update(val: any) {
    this._loadingService.loadingChanges.emit(true);
    if (this.selectedItems.length) {
      val.categories = [];
      val.fullName = val['name'];
      val.active = this.activeStatus;
      val.featuredStatus = this.featuredStatus;
      val.ref = this.agentRef;
      val.bookableStatus = this.bookableStatus;
      val.emailNotifications = this.emailNotifications;
      val.pushNotifications = this.pushNotifications;
      val.smsNotifications = this.smsNotifications;
      val.videoUrl = this._uploadvideoService.downloadURLvid;
      val.imageUrl = this._uploadvideoService.downloadURLimg;

      if (this.responseTime === null || this.responseTime < 1) {
        val.responseTime = 7;
      } else {
        val.responseTime = this.responseTime;
      }

      // tslint:disable-next-line:prefer-const
      let categoriesPromise = new Promise((resolve, reject) => {
        this.selectedItems.forEach((value, index, array) => {
          val.categories.push(value.id);
          if (index === array.length - 1) {
            resolve(val);
          }
        });
      });

      categoriesPromise.then(value => {
        this._celebrityService.updateById(value, value['id']).then(resp => {
          this._notificationsService.success('Star updated!', '', {
            timeOut: 3000,
            clickToClose: true,
            clickIconToClose: true
          });
          this._router.navigate(['dashboard/star-single/' + value['id']]);
        });
      });
      this._loadingService.loadingChanges.emit(false);
    } else {
      this._loadingService.loadingChanges.emit(false);
      this._notificationsService.error('Please select atleast one category', '', {
        timeOut: 3000,
        clickToClose: true,
        clickIconToClose: true
      });

    }

  }

  getAllCategories() {
    this.categories = [];
    this._categoryService.getAllCategories().subscribe(categories => {
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

  getAllAgents() {
    this.agents = [];
    this._agentService.getAllAgents().subscribe(resp => {
      this.agents.push(this.defaultAgent);
      resp.forEach(agent => {
        const temp = agent.payload.doc.data();
        temp['id'] = agent.payload.doc.id;
        this.agents.push(temp);
      });
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this._uploadvideoService.uploadVideo(this.fileToUpload, this.celebrity['id']);
    this.videoUploadPercentage = this._uploadvideoService.videoUploadPercentage;
    this.videoUploadSnapshot = this._uploadvideoService.videoUploadSnapshot;
  }

  handleFileImage(files: any) {
    const reader = new FileReader();
    reader.readAsDataURL(files.target.files[0]);
    reader.onload = (e: any) => this.compressFile(e.target.result);
  }

  compressFile(files: any) {
    this.imageCompress.compressFile(files, 50, 50).then(
      result => {
        this.uploadImage(new File([this.convertDataUrlToImage(result)], 'thumbnail'));
      }
    );
  }

  uploadImage(files: File) {
    this.fileToUploadimg = files;
    this._uploadvideoService.uploadImage(this.fileToUploadimg, this.celebrity['id']);
    this.imageUploadPercentage = this._uploadvideoService.imageUploadPercentage;
    this.imageUploadSnapshot = this._uploadvideoService.imageUploadSnapshot;
  }

  convertDataUrlToImage(dataUrl): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }

  onItemSelect(item: any) {}

  OnItemDeSelect(item: any) {}

  onSelectAll(items: any) {}

  onDeSelectAll(items: any) {
    this.selectedItems = [];
  }

  ngOnInit() {}

}
