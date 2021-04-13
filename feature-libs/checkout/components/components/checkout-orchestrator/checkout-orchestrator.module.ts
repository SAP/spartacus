import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import {
  CartNotEmptyGuard,
  defaultCheckoutConfig,
} from '@spartacus/storefront';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CheckoutGuard } from '../../guards/checkout.guard';
import { CheckoutOrchestratorComponent } from './checkout-orchestrator.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultCheckoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOrchestrator: {
          component: CheckoutOrchestratorComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutOrchestratorComponent],
  entryComponents: [CheckoutOrchestratorComponent],
  exports: [CheckoutOrchestratorComponent],
})
export class CheckoutOrchestratorModule {}
