import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRegistrationFormModule } from './form/user-registration-form.module';

@NgModule({
  imports: [RouterModule, UserRegistrationFormModule],
})
export class UserRegistrationComponentsModule {}
