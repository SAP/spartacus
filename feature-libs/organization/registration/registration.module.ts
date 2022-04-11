import { NgModule } from '@angular/core';
import { OrderApprovalComponentsModule } from './components/registration-components.module';
import { OrderApprovalCoreModule } from './core/registration-core.module';
import { OrderApprovalOccModule } from './occ/registration-occ.module';

@NgModule({
  imports: [
    // B2bRegistrationCoreModule.forRoot(),
    // B2bRegistrationOccModule,
    OrderApprovalComponentsModule,
  ],
})
export class B2bRegistrationModule {}
