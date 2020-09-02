import { SubscribeService } from './../../../../_services/subscribe.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  UserService
} from 'src/_services/user.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  CategoryService
} from 'src/_services//category.service';
import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-add-new-star',
  templateUrl: './add-new-star.component.html',
  styleUrls: ['./add-new-star.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-shadowed-variable
// tslint:disable:no-string-literal
export class AddNewStarComponent implements OnInit {


  talentForm = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    agent: new FormControl('', ),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  celebrities = [];
  enrollRequest = null;
  isDataAvailable: boolean;
  fieldTextType: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private http: HttpClient,
    private _celebrityService: CelebrityService,
    private _categoryService: CategoryService,
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit() {

    this._loadingService.loadingChanges.emit(true);

    this.enrollRequest = window.history.state.requestData;

    if (this.enrollRequest) {
      this.talentForm.controls['emailAddress'].setValue(this.enrollRequest['emailAddress']);
    }

    this._celebrityService.getRegisteredCelebrities().subscribe((celebrity) => {
      this.celebrities = [];

      if (celebrity.length > 0) {
        celebrity.forEach(celebrity => {
          const singleCelebrity = celebrity.payload.doc.data();
          singleCelebrity['id'] = celebrity.payload.doc.id;
          this.celebrities.push(singleCelebrity);
        });
        this.isDataAvailable = true;
        this._loadingService.loadingChanges.emit(false);
      } else {
        this.isDataAvailable = false;
        this._loadingService.loadingChanges.emit(false);
      }
    }, error => {
      this.isDataAvailable = false;
      this._loadingService.loadingChanges.emit(false);
    });

  }

  submitData() {

    if (this.talentForm.valid) {
      this._loadingService.loadingChanges.emit(true);
      let user = this.talentForm.getRawValue();

      if (this.enrollRequest) {
        user = {
          ...this.enrollRequest,
          ...user
        };
      }

      this._userService.createUser(user).subscribe(value => {
        const check = value.toString();
        if (check === 'sorry') {
          this._notificationsService.error('Email all-ready in Use', '', {
            timeOut: 3000,
            clickToClose: true,
            clickIconToClose: true
          });
        } else {
          this._notificationsService.success('Star created successfully!', '', {
            timeOut: 3000,
            clickToClose: true,
            clickIconToClose: true
          });
          this._router.navigate(['dashboard/all-star']);
        }
        this.talentForm.reset();
        this._loadingService.loadingChanges.emit(false);
      }, error => {
        if (error.status === 200) {
          this._notificationsService.success('Star created successfully!', '', {
            timeOut: 3000,
            clickToClose: true,
            clickIconToClose: true
          });
          this._router.navigate(['dashboard/all-star']);
        } else {
          this._notificationsService.error('Email all-ready in Use', '', {
            timeOut: 3000,
            clickToClose: true,
            clickIconToClose: true
          });
        }
        this.talentForm.reset();
        this._loadingService.loadingChanges.emit(false);
      });

    } else {
      // tslint:disable-next-line:forin
      for (const property in this.talentForm.getRawValue()) {
        this.talentForm.controls[property].markAsTouched();
      }
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  deleteStar(celebrityId) {
    this._celebrityService.deleteCelebrity(celebrityId).then((value) => {
      this._notificationsService.success('Star removed successfully!', '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        clickIconToClose: true
      });
    });
  }

}
