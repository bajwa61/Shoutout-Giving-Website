import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  SimpleNotificationsModule
} from 'angular2-notifications';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  ngxLoadingAnimationTypes,
  NgxLoadingModule
} from 'ngx-loading';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  AngularFireModule
} from '@angular/fire';
import {
  AngularFireAnalyticsModule
} from '@angular/fire/analytics';
import {
  AngularFireStorageModule
} from '@angular/fire/storage';
import {
  environment
} from '../environments/environment';
import {
  AngularFirestoreModule
} from '@angular/fire/firestore';
import {
  UserService
} from '../_services/user.service';
import {
  AngularFireAuthModule
} from '@angular/fire/auth';
import {
  AngularFireDatabaseModule
} from '@angular/fire/database';
import {
  AuthGuard
} from '../_services/auth.guard';
import {
  LoadingService
} from '../_services/loading.service';
import {
  FileService
} from '../_services/file.service';
import {
  HttpClientJsonpModule,
  HttpClientModule
} from '@angular/common/http';
import {
  PageService
} from '../_services/page.service';
import {
  SubscribeService
} from '../_services/subscribe.service';
import {
  DashboardService
} from '../_services/dashboard.service';
import {
  PaymentService
} from '../_services/payment.service';
import {
  OrderService
} from '../_services/order.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  AuthAgentGuard
} from 'src/_services/auth-agent.guard';
import {
  NgxImageCompressService
} from 'ngx-image-compress';
import { StateService } from 'src/_services/state.service';
import { BrandsService } from 'src/_services/brands.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      fullScreenBackdrop: true,
      primaryColour: '#3C1E54',
    }),
    SimpleNotificationsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule
  ],
  providers: [
    LoadingService,
    BrandsService,
    FileService,
    PageService,
    AuthGuard,
    AuthAgentGuard,
    UserService,
    StateService,
    SubscribeService,
    DashboardService,
    PaymentService,
    OrderService,
    CelebrityService,
    NgxImageCompressService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
