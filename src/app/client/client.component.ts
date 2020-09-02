import {
  OnInit,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AngularFireAnalytics
} from '@angular/fire/analytics';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  EventEmitterService
} from 'src/_services/emitter.service';

import * as path from 'src/_services/http.url';
@Component({
  // tslint:disable-next-line:component-selector
  selector: '.not-found-wrapper',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  encapsulation: ViewEncapsulation.None,
})

// tslint:disable:variable-name
// tslint:disable:no-shadowed-variable
// tslint:disable:no-string-literal
export class ClientComponent implements OnInit {

  currentRoute: any = '';

  constructor(
    private _router: Router,
    private _emitterService: EventEmitterService,
    analytics: AngularFireAnalytics
  ) {
    this.currentRoute = this._router.url;
    analytics.logEvent('website_accessed');
    this._emitterService.registerView().subscribe(val => {});
  }

  ngOnInit() {
    this.loadScript('../../../assets/client/assets/js/custom.js');
  }

  loadScript(url: string) {
    const body = document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
