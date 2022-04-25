import { NgModule } from '@angular/core';
import { UserRegistrationComponentsModule } from './components/user-registration-components.module';
import { UserRegistrationCoreModule } from './core/user-registration-core.module';

@NgModule({
  imports: [
    UserRegistrationCoreModule.forRoot(),
    /* TODO: Add OCC module */
    // UserRegistrationOccModule,
    UserRegistrationComponentsModule,
  ],
})
export class OrgUserRegistrationModule {}
