import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { AmendOrderActionsModule } from '../../amend-order-actions/amend-order-actions.module';
import { AmendOrderItemsModule } from '../../amend-order-items/amend-order-items.module';
import { OrderAmendService } from '../../amend-order.service';
import { OrderCancellationService } from '../order-cancellation.service';
import { CancelOrderComponent } from './cancel-order.component';

@NgModule({
  imports: [
    CommonModule,
    AmendOrderItemsModule,
    AmendOrderActionsModule,
    FormErrorsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
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
  ],
  declarations: [CancelOrderComponent],
  exports: [CancelOrderComponent],
})
export class CancelOrderModule {}
