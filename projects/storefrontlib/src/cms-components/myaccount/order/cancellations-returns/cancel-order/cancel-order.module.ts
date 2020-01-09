import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, CmsConfig, ConfigModule } from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
} from '../../../../../cms-structure/index';
import { AmendOrderActionsModule } from '../amend-order-actions/amend-order-actions.module';
import { CancelOrReturnItemsModule } from '../cancel-or-return-items/cancel-or-return-items.module';
import { OrderAmendService } from '../order-amend.service';
import { OrderCancellationService } from '../order-cancellation.service';
import { CancelOrderComponent } from './cancel-order.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'orderCancel',
        },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CancelOrderComponent: {
          component: CancelOrderComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: OrderAmendService,
              useExisting: OrderCancellationService,
            },
          ],
        },
      },
    }),
    CancelOrReturnItemsModule,
    AmendOrderActionsModule,
  ],
  declarations: [CancelOrderComponent],
  exports: [CancelOrderComponent],
  entryComponents: [CancelOrderComponent],
})
export class CancelOrderModule {}
