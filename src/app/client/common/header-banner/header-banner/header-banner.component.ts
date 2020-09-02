import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageChangeService } from 'src/_services/language-change.service';
import { StateService } from './../../../../../_services/state.service';
import { SignupDialogComponent } from '../../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.css']
})
export class HeaderBannerComponent implements OnInit {

  currentRoute: any = '';
  langEng = true;
  isLogin: boolean = false;
  cmpRef: any;
  @ViewChild('signUpForm', { read: ViewContainerRef, static: false }) signUpfrom: ViewContainerRef;
  constructor(
    private _router: Router,
    private _languageService: LanguageChangeService, private _stateService: StateService, private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.currentRoute = this._router.url;
  }

  ngOnInit() {
    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }
    this.isLogin = this._stateService.getIsLogin();
  }
  loadSingUpFrom() {
    this.signUpfrom.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(SignupDialogComponent);
    this.cmpRef = this.signUpfrom.createComponent(factory);
    // tslint:disable-next-line:align
    // if (!!this.cmpRef.instance.childEmitter) {
    //   //this.cmpRef.instance.childEmitter.subscribe(this.updateButtonStatus);
    // }
  }

}
