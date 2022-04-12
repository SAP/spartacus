import { NgModule } from '@angular/core';
import { RegistrationComponentsModule } from './components/registration-components.module';
import { RegistrationCoreModule } from './core/registration-core.module';

@NgModule({
  imports: [
    RegistrationCoreModule.forRoot(),
    // B2bRegistrationOccModule,
    RegistrationComponentsModule,
  ],
})
export class B2bRegistrationModule {}
