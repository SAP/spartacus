import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { OrderHistoryComponent } from './order-history.component';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orders' },
      },
    ]),
    RouterModule,
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [OrderHistoryComponent],
  exports: [OrderHistoryComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderHistoryComponent: {
          component: OrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class OrderHistoryModule {}
