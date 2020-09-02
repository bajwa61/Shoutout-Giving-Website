// Main imports
import {
  CommonModule,
  Location,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

// Libraries
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  SlickCarouselModule
} from 'ngx-slick-carousel';

import {
  InfiniteScrollModule
} from 'ngx-infinite-scroll';

// Services
import {
  EnrollService
} from 'src/_services/enroll.service';
import {
  CategoryService
} from 'src/_services/category.service';
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  PushNotificationsService
} from 'src/_services/push-notifications.service';
import {
  StateService
} from 'src/_services/state.service';

// Components
import {
  ClientComponent
} from './client.component';
import {
  DialogComponent
} from './common/dialog/dialog.component';
import {
  StickySearchComponent
} from './common/sticky-search/sticky-search.component';
import {
  HeaderComponent
} from './common/header/header.component';
import {
  HeaderSearchComponent
} from './common/header-search/header-search.component';
import {
  HeaderLandingComponent
} from './common/header-landing/header-landing.component';

import {
  FooterComponent
} from './common/footer/footer.component';
import {
  StarPageComponent
} from './star-page/star-page.component';
import {
  ComingSoonPageComponent
} from './coming-soon/coming-soon.component';
import {
  LandingPageComponent
} from './landing-page/landing-page.component';
// import {
//   FormPageComponent
// } from './enroll/form-page/form-page.component';
import {

  AgentSignupComponent
} from './agent/agent-signup/agent-signup.component';
import {
  AgentPageComponent
} from './agent/agent-page/agent-page.component';
// import {
//   TalentPageComponent
// } from './enroll/talent-page/talent-page.component';
import {

  CategoryPageComponent
} from './category-page/category-page.component';
import {
  CheckoutPageComponent
} from './checkout-page/checkout-page.component';
import {
  CongratulationComponent
} from './congratulation/congratulation.component';
import {
  TermsComponent
} from './terms/terms.component';
import {
  PressComponent
} from './press/press.component';
import {
  FaqComponent
} from './faq/faq.component';
import {
  ThankyouCustomerComponent
} from './thankyou/thankyou-customer/thankyou-customer.component';
import {
  ThankyouTalentComponent
} from './thankyou/thankyou-talent/thankyou-talent.component';
// import {
//   LoginComponent
// } from './login/login.component';
import {

  AboutComponent
} from './about/about.component';
import {
  ContactComponent
} from './contact/contact.component';
import {
  RefundComponent
} from './refund/refund.component';
import {
  PrivacyComponent
} from './privacy/privacy.component';
import {
  TransactionFailedComponent
} from './transaction-failed/transaction-failed.component';
import {
  TransactionSuccessfulComponent
} from './transaction-successful/transaction-successful.component';
import {
  PasswordComponent
} from '../dashboard/admin/password/password.component';
import {
  TestLandingPageComponent
} from './test/landing-page.component';
import { HeaderBannerComponent } from './common/header-banner/header-banner/header-banner.component';
import { SignupDialogComponent } from './common/signup-dialog/signup-dialog.component';
const routes: Routes = [{
  path: '',
  component: ClientComponent,
  children: [{
    path: '',

    component: ClientComponent,
    children: [{
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'coming-soon',
        component: ComingSoonPageComponent
      },
      {
        path: 'star/:id',
        component: StarPageComponent
      },
      // {
      //   path: 'enroll',
      //   component: FormPageComponent
      // },
      // {
      //   path: 'enroll-form',
      //   component: FormPageComponent
      // },
      // {
      //   path: 'enroll-talent',
      //   component: TalentPageComponent
      // },
      {
        path: 'category',
        component: CategoryPageComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'congratulation',
        component: CongratulationComponent
      },
      {
        path: 'terms',
        component: TermsComponent
      },
      {
        path: 'privacy',
        component: PrivacyComponent
      },
      {
        path: 'refund',
        component: RefundComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'press',
        component: PressComponent
      },
      {
        path: 'thankyou',
        component: ThankyouCustomerComponent
      },
      {
        path: 'thankyou-talent',
        component: ThankyouTalentComponent
      },
      // {
      //   path: 'login',
      //   component: LoginComponent
      // },
      {
        path: 'checkout/:id',
        component: CheckoutPageComponent
      },
      {
        path: 'agent-signup',
        component: AgentSignupComponent
      },
      {
        path: 'agent-page',
        component: AgentPageComponent
      },
      {
        path: 'transaction-failed',
        component: TransactionFailedComponent
      },
      {
        path: 'transaction-successful/:id',
        component: TransactionSuccessfulComponent
      },
      // {
      //   path: 'agent-login',
      //   component: LoginComponent
      // },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'test',
        component: TestLandingPageComponent
      },
    ]
  },
  {
    path: 'coming-soon',
    component: ComingSoonPageComponent
  },
  {
    path: 'star/:id',
    component: StarPageComponent
  },
  {
    path: 'enroll',
    component: FormPageComponent
  },
  {
    path: 'enroll-form',
    component: FormPageComponent
  },
  {
    path: 'enroll-brand',
    component: TalentPageComponent
  },
  {
    path: 'category',
    component: CategoryPageComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'congratulation',
    component: CongratulationComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'refund',
    component: RefundComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'press',
    component: PressComponent
  },
  // {
  //   path: 'thankyou',
  //   component: ThankyouCustomerComponent
  // },
  {
    path: 'thankyou-talent',
    component: ThankyouTalentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'checkout/:id',
    component: CheckoutPageComponent
  },
  {
    path: 'agent-signup',
    component: AgentSignupComponent
  },
  {
    path: 'agent-page',
    component: AgentPageComponent
  },
  {
    path: 'transaction-failed',
    component: TransactionFailedComponent
  },
  {
    path: 'transaction-successful/:id',
    component: TransactionSuccessfulComponent
  },
  {
    path: 'agent-login',
    component: LoginComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
    // {
    //   path: 'test',
    //   component: TestLandingPageComponent
    // },
  ]
},

];

@NgModule({
  imports: [



    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    SlickCarouselModule,
    InfiniteScrollModule
  ],
  exports: [RouterModule],
  declarations: [
    DialogComponent,
    StickySearchComponent,
    HeaderComponent,
    HeaderSearchComponent,
    HeaderLandingComponent,
    HeaderBannerComponent,
    FooterComponent,
    StarPageComponent,
    LandingPageComponent,
    CategoryPageComponent,
    ClientComponent,
    CheckoutPageComponent,
    AgentSignupComponent,
    AgentPageComponent,

    //TalentPageComponent,
    // FormPageComponent,
    FaqComponent,
    PressComponent,
    TermsComponent,
    CongratulationComponent,
    ThankyouCustomerComponent,
    ThankyouTalentComponent,

    // LoginComponent,
    AboutComponent,
    ContactComponent,
    RefundComponent,
    PrivacyComponent,
    TransactionFailedComponent,
    TransactionSuccessfulComponent,

    TestLandingPageComponent,
    SignupDialogComponent
  ],
  providers: [
    CelebrityService,
    EnrollService,
    CategoryService,
    PushNotificationsService,
    Location,
    StateService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ]
})


export class ClientModule {}