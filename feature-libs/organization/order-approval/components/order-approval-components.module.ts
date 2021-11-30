import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderApprovalOrderDetailsContextToken } from '@spartacus/organization/order-approval/root';
import { OrderApprovalDetailsModule } from './details/order-approval-details.module';
import { OrderApprovalListModule } from './list/order-approval-list.module';
import { OrderApprovalOrderDetailsContext } from './page-context/order-approval-order-details.context';

@NgModule({
  imports: [RouterModule, OrderApprovalListModule, OrderApprovalDetailsModule],
  providers: [
    {
      provide: OrderApprovalOrderDetailsContextToken,
      useExisting: OrderApprovalOrderDetailsContext,
    },
  ],
})
export class OrderApprovalComponentsModule {}
