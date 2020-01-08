import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard, CmsConfig, ConfigModule } from '@spartacus/core';
import { CmsPageGuard } from '../../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../../cms-structure/page/page-layout/page-layout.component';
import { AmendOrderActionsModule } from '../amend-order-actions/amend-order-actions.module';
import { CancelOrReturnItemsModule } from '../cancel-or-return-items/cancel-or-return-items.module';
import { OrderCancellationGuard } from '../guards/index';
import { OrderAmendService } from '../order-amend.service';
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
    ConfigModule.withConfig(<CmsConfig>{
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
    CancelOrReturnItemsModule,
    AmendOrderActionsModule,
  ],
  declarations: [CancelOrderConfirmationComponent],
  exports: [CancelOrderConfirmationComponent],
  entryComponents: [CancelOrderConfirmationComponent],
})
export class CancelOrderConfirmationModule {}
