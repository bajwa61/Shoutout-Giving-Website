import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CommonModule
} from '@angular/common';
import {
  NgModule
} from '@angular/core';
import {
  AngularEditorModule
} from '@kolkov/angular-editor';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

// Libraries
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  AngularMultiSelectModule
} from 'angular2-multiselect-dropdown';
import {
  Ng2SearchPipeModule
} from 'ng2-search-filter';

// Services
import {
  CelebrityService
} from 'src/_services/celebrity.service';
import {
  EnrollService
} from 'src/_services/enroll.service';
import {
  CategoryService
} from 'src/_services/category.service';
import {
  OrderService
} from 'src/_services/order.service';
import {
  PushNotificationsService
} from 'src/_services/push-notifications.service';
import {
  UploadvideoService
} from 'src/_services/uploadvideo.service';

// - Dashboard
import {
  AgentDashboardComponent
} from './agent-dashboard.component';
import {
  AgentDashBoardComponent
} from './agent-dash-board/agent-dash-board.component';
import {
  HeaderComponent
} from './common/agent-header/header.component';
import {
  FooterComponent
} from './common/agent-footer/footer.component';
import {
  ConversionsComponent
} from './conversions/conversions.component';
import {
  ConversionsDetailsComponent
} from './conversions/conversions-details/conversions-details.component';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  ProfileComponent
} from './admin/profile/profile.component';
import {
  OrdersComponent
} from './orders/orders.component';
import {
  OrderSingleComponent
} from './orders/order-single/order-single.component';
import {
  ChangePasswordComponent
} from './admin/change-password/change-password.component';
import {
  EditProfileComponent
} from './admin/profile/edit-profile/edit-profile.component';


// tslint:disable-next-line:no-unused-expression
const routes: Routes = [{
  path: '',
  component: AgentDashboardComponent,
  children: [{
      path: '',
      component: AgentDashBoardComponent
    },
    {
      path: 'home',
      component: AgentDashBoardComponent
    },
    // - Conversions
    {
      path: 'conversions',
      component: ConversionsComponent
    },
    {
      path: 'conversions-details/:id',
      component: ConversionsDetailsComponent
    },
    // Profile
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'edit-profile',
      component: EditProfileComponent
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent
    },
    // - Orders
    {
      path: 'orders',
      component: OrdersComponent
    },
    {
      path: 'order-single/:id',
      component: OrderSingleComponent
    },

  ]
}];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    FormsModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    NgbModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  exports: [RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    AgentDashboardComponent,
    AgentDashBoardComponent,
    ConversionsComponent,
    ConversionsDetailsComponent,
    ProfileComponent,
    OrdersComponent,
    OrderSingleComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
  providers: [
    CelebrityService,
    CategoryService,
    EnrollService,
    OrderService,
    PushNotificationsService,
    UploadvideoService,
  ]
})
export class AgentDashboardModule {}
