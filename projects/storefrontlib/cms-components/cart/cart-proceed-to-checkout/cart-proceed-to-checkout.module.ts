import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProgressButtonModule } from '../../../shared/components/progress-button/progress-button.module';
import { CartProceedToCheckoutComponent } from './cart-proceed-to-checkout.component';

@NgModule({
  imports: [CommonModule, ProgressButtonModule, RouterModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CartProceedToCheckoutComponent: {
          component: CartProceedToCheckoutComponent,
        },
      },
    }),
  ],
  declarations: [CartProceedToCheckoutComponent],
  exports: [CartProceedToCheckoutComponent],
})
export class CartProceedToCheckoutModule {}
