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
import { ListNavigationModule, ViewConfig } from '@spartacus/storefront';
import { CommerceQuotesListComponent } from './commerce-quotes-list/commerce-quotes-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
    ListNavigationModule,
  ],
  providers: [
    provideDefaultConfig(<ViewConfig>{
      view: {
        defaultPageSize: 5,
      },
    }),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountMyQuotesComponent: {
          component: CommerceQuotesListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CommerceQuotesListComponent],
  exports: [CommerceQuotesListComponent],
})
export class CommerceQuotesComponentsModule {}
