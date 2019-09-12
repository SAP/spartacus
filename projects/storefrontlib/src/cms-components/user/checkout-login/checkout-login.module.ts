import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  NotAuthGuard,
} from '@spartacus/core';
import { CheckoutLoginComponent } from './checkout-login.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        GuestCheckoutLoginComponent: {
          component: CheckoutLoginComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CheckoutLoginComponent],
  exports: [CheckoutLoginComponent],
  entryComponents: [CheckoutLoginComponent],
})
export class CheckoutLoginModule {}
