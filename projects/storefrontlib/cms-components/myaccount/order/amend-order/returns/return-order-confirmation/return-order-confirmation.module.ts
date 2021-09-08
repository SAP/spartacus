import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../../../cms-structure/page/page-layout/page-layout.component';
import { AmendOrderActionsModule } from '../../amend-order-actions/amend-order-actions.module';
import { AmendOrderItemsModule } from '../../amend-order-items/amend-order-items.module';
import { OrderAmendService } from '../../amend-order.service';
import { OrderReturnGuard } from '../order-return.guard';
import { OrderReturnService } from '../order-return.service';
import { ReturnOrderConfirmationComponent } from './return-order-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'orderReturnConfirmation',
        },
      },
    ]),
    AmendOrderItemsModule,
    I18nModule,
    ReactiveFormsModule,
    AmendOrderActionsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturnOrderConfirmationComponent: {
          component: ReturnOrderConfirmationComponent,
          guards: [AuthGuard, OrderReturnGuard],
          providers: [
            {
              provide: OrderAmendService,
              useExisting: OrderReturnService,
            },
          ],
        },
      },
    }),
  ],
  declarations: [ReturnOrderConfirmationComponent],
  exports: [ReturnOrderConfirmationComponent],
})
export class ReturnOrderConfirmationModule {}
