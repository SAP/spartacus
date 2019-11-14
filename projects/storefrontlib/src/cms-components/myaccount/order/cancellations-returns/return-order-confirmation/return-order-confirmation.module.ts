import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, CmsConfig, ConfigModule } from '@spartacus/core';
import { PageLayoutComponent } from '../../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../../cms-structure/guards/cms-page.guard';
import { CancellationReturnItemsModule } from '../cancellation-return-items/cancellation-return-items.module';
import { ReturnOrderConfirmationComponent } from './return-order-confirmation.component';
import { CancellationReturnRequestInputGuard } from '../guards/cancellation-return-request-input.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'my-account/order/:orderCode/return/confirmation',
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: '/my-account/order/return/confirmation' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ReturnOrderConfirmationComponent: {
          component: ReturnOrderConfirmationComponent,
          guards: [AuthGuard, CancellationReturnRequestInputGuard],
        },
      },
    }),
    CancellationReturnItemsModule,
  ],
  declarations: [ReturnOrderConfirmationComponent],
  exports: [ReturnOrderConfirmationComponent],
  entryComponents: [ReturnOrderConfirmationComponent],
})
export class ReturnOrderConfirmationModule {}
