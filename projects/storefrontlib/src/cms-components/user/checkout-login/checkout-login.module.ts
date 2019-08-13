import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutLoginComponent } from './checkout-login.component';

@NgModule({
  imports: [
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
  ],
  declarations: [CheckoutLoginComponent],
  exports: [CheckoutLoginComponent],
  entryComponents: [CheckoutLoginComponent],
})
export class CheckoutLoginModule {}
