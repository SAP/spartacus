import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { AmendOrderActionsModule } from '../../amend-order-actions/amend-order-actions.module';
import { AmendOrderItemsModule } from '../../amend-order-items/amend-order-items.module';
import { OrderAmendService } from '../../amend-order.service';
import { OrderCancellationGuard } from '../order-cancellation.guard';
import { OrderCancellationService } from '../order-cancellation.service';
import { CancelOrderConfirmationComponent } from './cancel-order-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'orderCancelConfirmation',
        },
      },
    ]),
    ReactiveFormsModule,
    AmendOrderItemsModule,
    AmendOrderActionsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CancelOrderConfirmationComponent: {
          component: CancelOrderConfirmationComponent,
          guards: [AuthGuard, OrderCancellationGuard],
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
  declarations: [CancelOrderConfirmationComponent],
  exports: [CancelOrderConfirmationComponent],
})
export class CancelOrderConfirmationModule {}
