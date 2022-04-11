import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationModule } from './registration/registration.module';

@NgModule({
  imports: [RouterModule, RegistrationModule],
})
export class RegistrationComponentsModule {}
