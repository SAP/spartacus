import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../../cms-structure/page/page-layout/page-layout.component';
import { AmendOrderActionsModule } from '../amend-order-actions/amend-order-actions.module';
import { CancelOrReturnItemsModule } from '../cancel-or-return-items/cancel-or-return-items.module';
import { OrderReturnGuard } from '../guards/index';
import { OrderAmendService } from '../order-amend.service';
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
    ConfigModule.withConfig(<CmsConfig>{
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
    CancelOrReturnItemsModule,
    I18nModule,
    ReactiveFormsModule,
    AmendOrderActionsModule,
  ],
  declarations: [ReturnOrderConfirmationComponent],
  exports: [ReturnOrderConfirmationComponent],
  entryComponents: [ReturnOrderConfirmationComponent],
})
export class ReturnOrderConfirmationModule {}
