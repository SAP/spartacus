import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { SubscriptionDetailsComponent } from './subscription-details.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, RouterModule],
  declarations: [SubscriptionDetailsComponent],
  exports: [SubscriptionDetailsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SubscriptionDetailsComponent: {
          component: SubscriptionDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class SubscriptionDetailsModule {}
