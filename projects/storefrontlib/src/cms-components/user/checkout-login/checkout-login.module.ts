import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { CheckoutLoginComponent } from './checkout-login.component';
import { NotCheckoutAuthGuard } from '../../checkout/guards/not-checkout-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        GuestCheckoutLoginComponent: {
          component: CheckoutLoginComponent,
          guards: [NotCheckoutAuthGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutLoginComponent],
  exports: [CheckoutLoginComponent],
  entryComponents: [CheckoutLoginComponent],
})
export class CheckoutLoginModule {}
