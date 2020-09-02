import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  EnrollService
} from '../../../../_services/enroll.service';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  LoadingService
} from '../../../../_services/loading.service';
import {
  UserService
} from '../../../../_services/user.service';
import {
  Router
} from '@angular/router';
import {
  LanguageChangeService
} from 'src/_services/language-change.service';
import {
  Observable
} from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import {
  isEmpty
} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './agent-signup.component.html',
  styleUrls: ['./agent-signup.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class AgentSignupComponent implements OnInit {
  langEng = true;
  agentForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, ]),
    lastname: new FormControl('', [Validators.required, ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    code: new FormControl('+93', [Validators.required]),
    termsAgreement: new FormControl(null, [Validators.required]),
  });

  jsonURL = '../../../../assets/client/assets/data/countrycodes.json';
  codesJson = [];
  agentEmail: any;
  uniqueUrl: any;
  ipAddress: any;
  urlSwitch: boolean;
  firstName = '';
  lastName = '';

  constructor(
    private _enrollService: EnrollService,
    private _router: Router,
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService,
    private _languageService: LanguageChangeService,
    private _http: HttpClient,
    private _userService: UserService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.getIPAddress();

    this.getJSON().subscribe(data => {
      this.codesJson = data.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  public getJSON(): Observable < any > {
    return this._http.get(this.jsonURL);
  }

  getIPAddress() {
    this.urlSwitch = true;
    this._enrollService.getIPAddress().subscribe((resp: any) => {
      this.ipAddress = resp.ip;
      this.checkUrl(resp.ip);
    });
  }


  submitEnrollRequest() {
    const email = this.agentForm.get('email').value;
    this._userService.checkUser(email).toPromise().then(responce => {
      if (responce === 'false') {
        if (this.agentForm.valid) {
          this._loadingService.loadingChanges.emit(true);
          const enrollRequest = this.agentForm.getRawValue();
          let firstname = enrollRequest['firstname'].toLowerCase();
          let lastname = enrollRequest['lastname'].toLowerCase();

          firstname = firstname.substring(0, 2);
          lastname = lastname.substring(0, 2);
          const randomNumber = Math.floor(Math.random() * 1000);

          enrollRequest.date = new Date();
          enrollRequest.ipAddress = this.ipAddress;
          enrollRequest.email = enrollRequest.email.toLowerCase();
          enrollRequest.ref = firstname + lastname + randomNumber;
          if (enrollRequest.ipAddress) {
            this._enrollService.sumbitAgentRequest(enrollRequest).then(value => {
              this.uniqueUrl = 'https://halahi.com/enroll/?grsf=' + firstname + lastname + randomNumber;
              this.urlSwitch = true;
              this._loadingService.loadingChanges.emit(false);
            });
          }
        } else {
          // tslint:disable-next-line:forin
          for (const property in this.agentForm.getRawValue()) {
            this.agentForm.controls[property].markAsTouched();
          }
        }
      } else if (responce === 'true') {
        this._notificationsService.error('Email all-ready in Use', '', {
          timeOut: 3000,
          clickToClose: true,
          clickIconToClose: true
        });
      }
    });

  }
  checkUrl(ipadr) {

    this._enrollService.checkAgents(ipadr).subscribe((resp) => {
      if (resp.length) {
        const payloadData = resp[0].payload.doc.data();
        this.getAgentUrl(payloadData['email']);
      } else {
        this.urlSwitch = false;
        this._loadingService.loadingChanges.emit(false);
      }
    });
  }

  getAgentUrl(email) {
    this._enrollService.getAgentUrl(email).subscribe(resp => {
      const data = resp[0].payload.doc.data();
      this.uniqueUrl = data['refLink'];
      this._loadingService.loadingChanges.emit(false);
    });
  }

  copyMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  ngOnInit(): void {

    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }

  }
}
