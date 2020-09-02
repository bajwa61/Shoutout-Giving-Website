import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {LoadingService} from 'src/_services/loading.service';
import {CelebrityService} from 'src/_services/celebrity.service';
import {UserService} from 'src/_services/user.service';

@Component({
  selector: 'app-star-password-change',
  templateUrl: './star-password-change.component.html',
  styleUrls: ['./star-password-change.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class StarPasswordChangeComponent implements OnInit {

  celebrity: any;
  emailAddress: string;
  password: string;
  comformPassowrd: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _userService: UserService,
    private _loadingService: LoadingService,
    private _celebrityService: CelebrityService) {

    this._route.paramMap.subscribe(params => {
      this.celebrity['id'] = params.get('id');
    });
    this._route.params.subscribe(params => {
      this.getCelebrity(params['id']);
    });

  }
  talentForm = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {

  }
  getCelebrity(celebrityId) {
    this._celebrityService.getCelebrity(celebrityId).subscribe(
      (fetchedCelebrity) => {
        console.log(fetchedCelebrity);
        this.celebrity = fetchedCelebrity;
        this.emailAddress = this.celebrity['emailAddress'];
        this.celebrity['id'] = celebrityId;
        this._loadingService.loadingChanges.emit(false);
      }
    );
  }

  submitData() {
    if (this.talentForm.valid) {
      this._loadingService.loadingChanges.emit(true);
      const changeRequest = this.talentForm.getRawValue();
      if (changeRequest.password === changeRequest.confirmPassword) {
        this._userService.submitChangePassword(changeRequest).then(value => {
          this._loadingService.loadingChanges.emit(false);
          this._notificationsService.success('Password updated!', '', {
            timeOut: 3000,
            clickToClose: true,
            clickIconToClose: true
          });
          this._router.navigate(['dashboard/star-single/' + this.celebrity['id']]);
        });
      }
    } else {
      // tslint:disable-next-line:forin
      for (const property in this.talentForm.getRawValue()) {
        this.talentForm.controls[property].markAsTouched();
      }
    }
  }

}
