import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { CardModule } from '../../../../../../shared/components/card/card.module';
import { BootstrapModule } from '../../../../../bootstrap.module';
import { BillingAddressFormModule } from '../billing-address-form/billing-address-form.module';
import { IconModule } from '../../../../../../cms-components/misc/icon/index';
import { PaymentFormComponent } from './payment-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    BootstrapModule,
    CardModule,
    BillingAddressFormModule,
    I18nModule,
    IconModule,
  ],
  declarations: [PaymentFormComponent],
  entryComponents: [PaymentFormComponent],
  exports: [PaymentFormComponent],
})
export class PaymentFormModule {}
