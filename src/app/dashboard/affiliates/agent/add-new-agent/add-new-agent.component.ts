import {
  Component,
  OnInit

} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl

} from '@angular/forms';
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
  UserService

} from 'src/_services/user.service';

@Component({

  selector: 'app-add-new-agent',
  templateUrl: './add-new-agent.component.html',
  styleUrls: ['./add-new-agent.component.css'],
})

// tslint:disable:variable-name
export class AddNewAgentComponent implements OnInit {

  agentForm = new FormGroup({

    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    ref: new FormControl('', [Validators.required]),
  });


  halahiUrl = 'https://halahi.com/enroll/?grsf=';
  uniqueUrl: any;
  ipAddress: any;
  urlSwitch: boolean;

  constructor(

    private _enrollService: EnrollService,
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService,
    private _userService: UserService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.getIPAddress();
  }

  getIPAddress() {
    this.urlSwitch = true;
    this._enrollService.getIPAddress().subscribe((resp: any) => {

        this.ipAddress = resp.ip;
        this.urlSwitch = false;
        this._loadingService.loadingChanges.emit(false);
      },
      error => {
        this._loadingService.loadingChanges.emit(false);
      });
  }

  submitEnrollRequest() {
    this._loadingService.loadingChanges.emit(true);
    const email = this.agentForm.get('email').value;
    this._userService
      .checkUser(email)
      .toPromise()
      .then((responce) => {

          if (responce === 'false') {
            if (this.agentForm.valid) {
              const enrollRequest = this.agentForm.getRawValue();
              enrollRequest.date = new Date();
              enrollRequest.ipAddress = this.ipAddress;
              enrollRequest.email = enrollRequest.email.toLowerCase();
              if (enrollRequest.ipAddress) {
                this._enrollService
                  .sumbitAgentRequest(enrollRequest)
                  .then((value) => {
                    this.uniqueUrl = this.halahiUrl + enrollRequest.ref;
                    this.urlSwitch = true;
                    this._loadingService.loadingChanges.emit(false);
                  });
              }
            } else {
              // tslint:disable-next-line:forin
              for (const property in this.agentForm.getRawValue()) {
                this.agentForm.controls[property].markAsTouched();
                this._loadingService.loadingChanges.emit(false);
              }
            }

          } else if (responce === 'true') {
            this._notificationsService.error('Email already in use', '', {
              timeOut: 3000,
              clickToClose: true,
              clickIconToClose: true,
            });
            this._loadingService.loadingChanges.emit(false);
          }

        },
        error => {
          this._loadingService.loadingChanges.emit(false);

        });
  }

  getAgentUrl(email) {
    this._enrollService.getAgentUrl(email).subscribe((resp) => {
        const data = resp[0].payload.doc.data();
        // tslint:disable-next-line:no-string-literal
        this.uniqueUrl = data['refLink'];
        this._loadingService.loadingChanges.emit(false);
      },
      error => {
        this._loadingService.loadingChanges.emit(false);
      });
  }

  copyMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  ngOnInit(): void {}
}
