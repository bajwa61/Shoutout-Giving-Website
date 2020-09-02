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

// Components
// - Dashboard
import {
  DashboardComponent
} from './dashboard.component';
import {
  DashBoardComponent
} from './dash-board/dash-board.component';
// - Common
import {
  HeaderComponent
} from './common/header/header.component';
import {
  FooterComponent
} from './common/footer/footer.component';
// - Pages
import {
  AllPagesComponent
} from './pages/all-pages/all-pages.component';
import {
  AddNewPageComponent
} from './pages/add-new-page/add-new-page.component';
// - Affiliates
import {
  AgentComponent
} from './affiliates/agent/agent.component';
import {
  ConversionsComponent
} from './affiliates/conversions/conversions.component';
import {
  AgentSingleComponent
} from './affiliates/agent/agent-single/agent-single.component';
import {
  AddNewAgentComponent
} from './affiliates/agent/add-new-agent/add-new-agent.component';
import {
  CelebrityOrdersComponent
} from './affiliates/agent/agent-single/celebrity-orders/celebrity-orders.component';
// - Stars
import {
  AllStarsComponent
} from './stars/all-stars/all-stars.component';
import {
  StarSingleComponent
} from './stars/star-single/star-single.component';
import {
  AddNewStarComponent
} from './stars/add-new-star/add-new-star.component';
import {
  EditStarComponent
} from './stars/edit-star/edit-star.component';
import {
  StarPasswordChangeComponent
} from './stars/star-password-change/star-password-change.component';
import {
  StarNotificationComponent
} from './stars/star-notification/star-notification.component';
// - Categories
import {
  CategoriesComponent
} from './categories/categories.component';
// - Enrol Talent
import {
  EnrollTalentComponent
} from './enroll-talent/enroll-talent-list/enroll-talent-list.component';
import {
  EnrollTalentSingleComponent
} from './enroll-talent/enroll-talent-single/enroll-talent-single.component';
// - Orders
import {
  OrdersComponent
} from './orders/order-list/order-list.component';
import {
  OrderSingleComponent
} from './orders/order-single/order-single.component';
import {
  EditOrderComponent
} from './orders/edit-order/edit-order.component';
import {
  AddNewOrderComponent
} from './orders/add-new-order/add-new-order.component';
import {
  DeliverOrderComponent
} from './orders/deliver-order/deliver-order.component';
// - Marketing
import {
  MarketingSignupsComponent
} from './marketing/signups/signups.component';
// - Notifications
import {
  PushNotificationsComponent
} from './notifications/push-notifications/push-notifications.component';
// - Admin Settings
import {
  ProfileComponent
} from './admin/profile/profile.component';
import {
  EditProfileComponent
} from './admin/edit-profile/edit-profile.component';
import {
  PasswordComponent
} from './admin/password/password.component';
import {
  ChangePasswordComponent
} from './admin/change-password/change-password.component';
import {
  ResetPasswordComponent
} from './admin/reset-password/reset-password.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [{
      path: '',
      component: DashBoardComponent
    },
    {
      path: 'home',
      component: DashBoardComponent
    },
    // - Pages
    {
      path: 'all-pages',
      component: AllPagesComponent
    },
    {
      path: 'new-page/:id',
      component: AddNewPageComponent
    },
    // - Agent
    {
      path: 'agent',
      component: AgentComponent
    },
    {
      path: 'agent-single/:id',
      component: AgentSingleComponent
    },
    {
      path: 'conversions',
      component: ConversionsComponent
    },
    {
      path: 'new-agent',
      component: AddNewAgentComponent
    },
    {
      path: 'celebrity-orders/:id',
      component: CelebrityOrdersComponent
    },
    // - Stars
    {
      path: 'all-star',
      component: AllStarsComponent
    },
    {
      path: 'star-single/:id',
      component: StarSingleComponent
    },
    {
      path: 'new-star',
      component: AddNewStarComponent
    },
    {
      path: 'edit-star/:id',
      component: EditStarComponent
    },
    {
      path: 'star-password-change/:id',
      component: StarPasswordChangeComponent
    },
    {
      path: 'star-notification/:id',
      component: StarNotificationComponent
    },
    // - Categories
    {
      path: 'categories',
      component: CategoriesComponent
    },
    // - Enrol Talent
    {
      path: 'enroll-talent',
      component: EnrollTalentComponent
    },
    {
      path: 'enroll-talent-single/:id',
      component: EnrollTalentSingleComponent
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
    {
      path: 'edit-order/:id',
      component: EditOrderComponent
    },
    {
      path: 'add-new-order',
      component: AddNewOrderComponent
    },
    {
      path: 'deliver-order/:id',
      component: DeliverOrderComponent
    },
    // - Marketing
    {
      path: 'marketing-signups',
      component: MarketingSignupsComponent
    },
    // - Notifications
    {
      path: 'push-notifications',
      component: PushNotificationsComponent
    },
    // - Admin Settings
    {
      path: 'change-password',
      component: ChangePasswordComponent
    },
    {
      path: 'edit-profile',
      component: EditProfileComponent
    },
    {
      path: 'password',
      component: PasswordComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'reset-password',
      component: ResetPasswordComponent
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
  ],
  exports: [RouterModule],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AddNewPageComponent,
    AddNewStarComponent,
    AllPagesComponent,
    AllStarsComponent,
    CategoriesComponent,
    ChangePasswordComponent,
    DashBoardComponent,
    EditProfileComponent,
    EnrollTalentComponent,
    EnrollTalentSingleComponent,
    OrderSingleComponent,
    OrdersComponent,
    PasswordComponent,
    ProfileComponent,
    ResetPasswordComponent,
    StarSingleComponent,
    EditStarComponent,
    PushNotificationsComponent,
    StarPasswordChangeComponent,
    AgentComponent,
    ConversionsComponent,
    AgentSingleComponent,
    AddNewAgentComponent,
    CelebrityOrdersComponent,
    MarketingSignupsComponent,
    AddNewOrderComponent,
    EditOrderComponent,
    DeliverOrderComponent,
    StarNotificationComponent
  ],
  providers: [
    CelebrityService,
    CategoryService,
    EnrollService,
    OrderService,
    PushNotificationsService,
    UploadvideoService
  ]
})

export class DashboardModule {}