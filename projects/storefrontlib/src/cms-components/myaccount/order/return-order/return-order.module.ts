import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { MediaModule } from '../../../../shared/index';

import { ReturnOrderComponent } from './return-order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'my-account/order/:orderCode/return',
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: '/my-account/order/return' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ReturnOrderComponent: {
          component: ReturnOrderComponent,
          guards: [AuthGuard],
        },
      },
    }),
    CartSharedModule,
    UrlModule,
    I18nModule,
    MediaModule,
  ],
  declarations: [ReturnOrderComponent],
  exports: [ReturnOrderComponent],
  entryComponents: [ReturnOrderComponent],
})
export class ReturnOrderModule {}
