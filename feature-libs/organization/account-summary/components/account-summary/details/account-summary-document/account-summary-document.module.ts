import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';

@NgModule({
  declarations: [AccountSummaryDocumentComponent],
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountSummaryDocumentComponent: {
          component: AccountSummaryDocumentComponent,
        },
      },
    }),
  ],
})
export class AccountSummaryDocumentModule { }
