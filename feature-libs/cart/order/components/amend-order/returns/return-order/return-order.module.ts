import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import {
  CmsPageGuard,
  FormErrorsModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { AmendOrderActionsModule } from '../../amend-order-actions/amend-order-actions.module';
import { AmendOrderItemsModule } from '../../amend-order-items/amend-order-items.module';
import { OrderAmendService } from '../../amend-order.service';
import { OrderReturnService } from '../order-return.service';
import { ReturnOrderComponent } from './return-order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'orderReturn',
        },
      },
    ]),
    AmendOrderItemsModule,
    AmendOrderActionsModule,
    FormErrorsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturnOrderComponent: {
          component: ReturnOrderComponent,
          guards: [AuthGuard],
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
  declarations: [ReturnOrderComponent],
  exports: [ReturnOrderComponent],
})
export class ReturnOrderModule {}
