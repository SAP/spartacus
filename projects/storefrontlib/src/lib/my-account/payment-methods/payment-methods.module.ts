import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CmsConfig,
  ConfigModule,
  UserService,
  I18nModule,
} from '@spartacus/core';
import { PaymentMethodsComponent } from './components/payment-methods.component';
import { CardModule } from '../../ui/components/card/card.module';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountPaymentDetailsComponent: { selector: 'cx-payment-methods' },
      },
    }),
    I18nModule,
  ],
  providers: [UserService],
  declarations: [PaymentMethodsComponent],
  exports: [PaymentMethodsComponent],
  entryComponents: [PaymentMethodsComponent],
})
export class PaymentMethodsModule {}
