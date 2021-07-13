import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { CartNotEmptyGuard } from '@spartacus/storefront';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CheckoutGuard } from '../../guards/checkout.guard';
import { CheckoutOrchestratorComponent } from './checkout-orchestrator.component';
import { CartValidationGuard } from '@spartacus/cart/validation/components';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOrchestrator: {
          component: CheckoutOrchestratorComponent,
          guards: [
            CheckoutAuthGuard,
            CartNotEmptyGuard,
            CartValidationGuard,
            CheckoutGuard,
          ],
        },
      },
    }),
  ],
  declarations: [CheckoutOrchestratorComponent],
  exports: [CheckoutOrchestratorComponent],
})
export class CheckoutOrchestratorModule {}
