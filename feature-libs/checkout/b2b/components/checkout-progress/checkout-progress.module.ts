import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartNotEmptyGuard } from '@spartacus/checkout/base/components';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CheckoutB2BAuthGuard } from '../guards/checkout-b2b-auth.guard';
import { CheckoutB2BStepsSetGuard } from '../guards/checkout-b2b-steps-set.guard';
import { B2BCheckoutProgressComponent } from './checkout-progress.component';
import { MultiLinePipe } from './multiline-titles.pipe';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, RouterModule],
  declarations: [B2BCheckoutProgressComponent, MultiLinePipe],
  exports: [B2BCheckoutProgressComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutProgress: {
          component: B2BCheckoutProgressComponent,
          guards: [
            CheckoutB2BAuthGuard,
            CartNotEmptyGuard,
            CheckoutB2BStepsSetGuard,
          ],
        },
      },
    }),
  ],
})
export class B2BCheckoutProgressModule {}
