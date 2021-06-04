import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UrlModule } from '@spartacus/core';
import { CheckoutLoginModule } from './checkout-login/checkout-login.module';
import { LoginRouteModule } from './login-route/login-route.module';
import { LogoutModule } from './logout/logout.module';

@NgModule({
  imports: [
    LogoutModule,
    LoginRouteModule,
    CheckoutLoginModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
  ],
})
export class UserComponentModule {}
