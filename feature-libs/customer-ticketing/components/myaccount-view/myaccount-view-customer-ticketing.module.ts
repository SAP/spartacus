import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  CmsConfig,
  AuthGuard,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { MyAccountViewCustomerTicketingComponent } from './myaccount-view-customer-ticketing.component';
import { SpinnerModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MyAccountViewCustomerTicketingComponent],
  exports: [MyAccountViewCustomerTicketingComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountViewRequestsComponent: {
          component: MyAccountViewCustomerTicketingComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  imports: [CommonModule, I18nModule, UrlModule, SpinnerModule, RouterModule],
})
export class MyAccountViewCustomerTicketingModule {}
