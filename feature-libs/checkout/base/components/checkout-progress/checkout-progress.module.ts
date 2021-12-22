import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CheckoutAuthGuard,
  CheckoutStepsSetGuard,
} from '@spartacus/checkout/base/root';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutProgressComponent } from './checkout-progress.component';
import { MultiLinePipe } from './multiline-titles.pipe';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, RouterModule],
  declarations: [CheckoutProgressComponent, MultiLinePipe],
  exports: [CheckoutProgressComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutProgress: {
          component: CheckoutProgressComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
        },
      },
    }),
  ],
})
export class CheckoutProgressModule {}
