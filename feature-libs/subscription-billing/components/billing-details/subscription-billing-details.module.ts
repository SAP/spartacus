import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionBillingDetailsComponent } from './subscription-billing-details.component';
import { provideDefaultConfig, CmsConfig, AuthGuard } from '@spartacus/core';

@NgModule({
  imports: [CommonModule],
  declarations: [SubscriptionBillingDetailsComponent],
  exports: [SubscriptionBillingDetailsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SubscriptionBillDetailsComponent: {
          component: SubscriptionBillingDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class SubscriptionBillingDetailsModule {}
