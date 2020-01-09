import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { PageLayoutComponent } from '../../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../../cms-structure/guards/cms-page.guard';
import { CancelOrReturnItemsModule } from '../cancel-or-return-items/cancel-or-return-items.module';
import { CancelOrderConfirmationComponent } from './cancel-order-confirmation.component';
import { CancelOrReturnRequestInputGuard } from '../guards/cancel-or-return-request-input.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          pageLabel: '/my-account/order/cancel/confirmation',
          cxRoute: 'orderCancelConfirmation',
        },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CancelOrderConfirmationComponent: {
          component: CancelOrderConfirmationComponent,
          guards: [AuthGuard, CancelOrReturnRequestInputGuard],
        },
      },
    }),
    CancelOrReturnItemsModule,
    I18nModule,
  ],
  declarations: [CancelOrderConfirmationComponent],
  exports: [CancelOrderConfirmationComponent],
  entryComponents: [CancelOrderConfirmationComponent],
})
export class CancelOrderConfirmationModule {}
