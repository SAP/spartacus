import { NgModule } from '@angular/core';
import { OrderApprovalComponentsModule } from './components/order-approval-components.module';
import { OrderApprovalCoreModule } from './core/order-approval-core.module';
import { OrderApprovalOccModule } from './occ/order-approval-occ.module';

@NgModule({
  imports: [
    OrderApprovalCoreModule.forRoot(),
    OrderApprovalOccModule,
    OrderApprovalComponentsModule,
  ],
})
export class OrderApprovalModule {}
