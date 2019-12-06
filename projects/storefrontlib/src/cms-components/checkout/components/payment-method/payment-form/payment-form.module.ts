import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { CardModule } from '../../../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../../../shared/components/spinner/spinner.module';
import { IconModule } from '../../../../misc/icon/icon.module';
import { BillingAddressFormModule } from '../billing-address-form/billing-address-form.module';
import { PaymentFormComponent } from './payment-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    CardModule,
    BillingAddressFormModule,
    I18nModule,
    IconModule,
    SpinnerModule,
  ],
  declarations: [PaymentFormComponent],
  entryComponents: [PaymentFormComponent],
  exports: [PaymentFormComponent],
})
export class PaymentFormModule {}
