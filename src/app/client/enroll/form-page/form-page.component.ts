import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import {
  Location
} from '@angular/common';
import {
  Observable
} from 'rxjs';
import {
  EnrollService
} from 'src/_services/enroll.service';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  LoadingService
} from 'src/_services/loading.service';
import {
  LanguageChangeService
} from 'src/_services/language-change.service';
import {
  BrandsService
} from 'src/_services/brands.service';

@Component({
  selector: 'app-form',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})

export class FormPageComponent implements OnInit {
  langEng = true;
  encRequest: string;
  accessCode: String;
  isDataAvailable: boolean;
  fieldTextType: boolean;
  jsonURL = '../../../../assets/client/assets/data/countrycodes.json';
  @ViewChild('form') form: ElementRef;
  talentForm = new FormGroup({
    companyName: new FormControl('', [Validators.required, ]),
    companyWebsite: new FormControl('', [Validators.required, ]),
    companyRepresentativeName: new FormControl('', [Validators.required, ]),
    companyBio: new FormControl('', [Validators.required, ]),
    representativeContactPersonName: new FormControl('', [Validators.required, ]),
    // joiningPurpose: new FormControl('', [Validators.required,]),
    emailAddress: new FormControl('', [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    code: new FormControl('+93', [Validators.required]),
    termsAgreement: new FormControl(null, [Validators.required])
  });

  codesJson = [];

  // tslint:disable:variable-name
  // tslint:disable:no-string-literal
  constructor(
    private _enrollService: EnrollService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService,
    private _location: Location,
    private _http: HttpClient,
    private _languageService: LanguageChangeService,
    private _brandsService: BrandsService
  ) {

    localStorage.removeItem('refcode');
    this.getJSON().subscribe(data => {
      this.codesJson = data.sort((a, b) => a.name.localeCompare(b.name));
    });
    const url = this._location.path();

    let urlReplaced;

    // if (url.includes('/enroll-form')) {
    //   urlReplaced = url.replace('/enroll-form', '');
    //   if (urlReplaced) {
    //     const refcode = urlReplaced.replace('?grsf=', '');
    //     localStorage.setItem('refcode', refcode.trim());
    //   }
    // } else {
    //   urlReplaced = url.replace('/enroll', '');
    //   if (urlReplaced) {
    //     const refcode = urlReplaced.replace('?grsf=', '');
    //     localStorage.setItem('refcode', refcode.trim());
    //   }
    // }

    // this.getJSON().subscribe(data => {
    //   this.codesJson = data.sort((a, b) => a.name.localeCompare(b.name));
    // });

  }
  ngOnInit(): void {
    this.accessCode = 'AVNE03HD40BD51ENDB';
  }

  public getJSON(): Observable < any > {
    return this._http.get(this.jsonURL);
  }

  submitEnrollRequest() {

    if (this.talentForm.valid) {
      
      console.log(this.talentForm.getRawValue());
      this._loadingService.loadingChanges.emit(true);
      // tslint:disable-next-line:prefer-const
      let enrollRequest = this.talentForm.getRawValue();
      // tslint:disable-next-line:prefer-const
      let enrollData = {
      companyName : enrollRequest.companyName,
      companyWebsite : enrollRequest.companyWebsite,
      companyRepresentativeName : enrollRequest.companyRepresentativeName,
      companyBio : enrollRequest.companyBio,
      representativeContactPersonName : enrollRequest.representativeContactPersonName,
      representativeContactNumber : enrollRequest.phone,
      code : enrollRequest.code,
      joiningPurpose : 'dont know',
      representativeContactEmail : enrollRequest.emailAddress.toLowerCase(),
      password : enrollRequest.password,
      confirmPassword : enrollRequest.confirmPassword,
      }
      console.log(enrollData);
      this._brandsService.setenrollBrand(enrollData).toPromise().then(val => {

        return this._brandsService.getEnc(val).toPromise().then(response => {

          this.encRequest = response.toString();
          setTimeout(_ => this.form.nativeElement.submit());
          this._loadingService.loadingChanges.emit(false);

        }, error => {
          this._loadingService.loadingChanges.emit(false);
        });
      });

    } else {
      console.log('not working')
      for (let property in this.talentForm.getRawValue()) {
        this.talentForm.controls[property].markAsTouched();
      }

    }
  }


  makeConversion(ref, email, name) {
    const payload = {
      name,
      email,
      ref
    };
    this._enrollService.makeConversion(payload).then(value => {
      this._router.navigate(['/thankyou-talent']);
    });
  }

}
