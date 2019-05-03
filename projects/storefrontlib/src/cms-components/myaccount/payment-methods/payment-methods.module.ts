import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UserService,
} from '@spartacus/core';
import { CardModule } from '../../../lib/ui/components/card/card.module';
import { SpinnerModule } from '../../../lib/ui/components/spinner/spinner.module';
import { PaymentMethodsComponent } from './payment-methods.component';

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
