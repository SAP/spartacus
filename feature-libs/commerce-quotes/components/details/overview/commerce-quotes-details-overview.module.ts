import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig
} from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { CommerceQuotesDetailsOverviewComponent } from './commerce-quotes-details-overview.component';

@NgModule({
  imports: [CommonModule, I18nModule, CardModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CommerceQuotesDetailsOverviewComponent: {
          component: CommerceQuotesDetailsOverviewComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CommerceQuotesDetailsOverviewComponent],
  exports: [CommerceQuotesDetailsOverviewComponent],
})
export class CommerceQuotesDetailsOverviewModule {}
