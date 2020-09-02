import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {LoadingService} from '../../../_services/loading.service';
import {PageService} from 'src/_services/page.service';
import {PushNotificationsService} from 'src/_services/push-notifications.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

// tslint:disable:variable-name
export class ContactComponent implements OnInit {

  // tslint:disable-next-line:member-ordering
  contactData = {};

  contactForm = new FormGroup({
    name: new FormControl( '', [Validators.required, ]),
    emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    phone: new FormControl('', ),
    subject: new FormControl( '', [Validators.required, ]),
    message: new FormControl( '', [Validators.required, ]),
  });

  constructor(
    private _pageService: PageService,
    private _messagingService: PushNotificationsService,
    private _notificationsService: NotificationsService,
    private _loadingService: LoadingService,
  ) {
    this._pageService.getPageByType('contact').subscribe(value => {
      this.contactData = value[0].payload.doc.data();
    });
  }

  submitMessage() {
    if (this.contactForm.valid) {
      this._loadingService.loadingChanges.emit(true);
      const formData = this.contactForm.getRawValue();
      console.log(this.contactForm.getRawValue());

      this._messagingService.sendContactUsMessage(formData).then(value => {
        this.contactForm.reset();
        this._loadingService.loadingChanges.emit(false);
        this._notificationsService.success('Message sent. We will reach out to you soon...', '', {
          timeOut: 3000,
          clickToClose: true,
          clickIconToClose: true
        });
      });

    } else {
      // tslint:disable-next-line:forin
      for (const property in this.contactForm.getRawValue()) {
        this.contactForm.controls[property].markAsTouched();
      }
    }
  }

  ngOnInit(): void {}

}
