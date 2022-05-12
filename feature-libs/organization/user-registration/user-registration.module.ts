import { NgModule } from '@angular/core';
import { UserRegistrationComponentsModule } from './components/user-registration-components.module';
import { UserRegistrationOccModule } from './occ/user-registration-occ.module';
import { UserRegistrationCoreModule } from './core/user-registration-core.module';

@NgModule({
  imports: [
    UserRegistrationCoreModule.forRoot(),
    UserRegistrationOccModule,
    UserRegistrationComponentsModule,
  ],
})
export class OrganizationUserRegistrationModule {}
