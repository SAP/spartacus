import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import {
  CardModule,
  FormErrorsModule,
  IconModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CheckoutPaymentFormComponent } from './checkout-payment-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    CardModule,
    I18nModule,
    IconModule,
    SpinnerModule,
    FormErrorsModule,
  ],
  declarations: [CheckoutPaymentFormComponent],
  exports: [CheckoutPaymentFormComponent],
})
export class CheckoutPaymentFormModule {}
