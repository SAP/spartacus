import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CheckoutLoginComponent } from './checkout-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
