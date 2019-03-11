import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodsComponent } from './components/payment-methods.component';
import { CardModule } from '../../ui/components/card/card.module';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';
import { CmsConfig, ConfigModule, UserService } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountPaymentDetailsComponent: { selector: 'cx-payment-methods' }
      }
    })
  ],
  providers: [UserService],
  declarations: [PaymentMethodsComponent],
  exports: [PaymentMethodsComponent],
  entryComponents: [PaymentMethodsComponent]
})
export class PaymentMethodsModule {}
