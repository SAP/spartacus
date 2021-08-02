import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { CartNotEmptyGuard } from '../../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CheckoutGuard } from '../../guards/checkout.guard';
import { CheckoutOrchestratorComponent } from './checkout-orchestrator.component';

@NgModule({
  imports: [CommonModule],
  providers: [
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
  exports: [CheckoutOrchestratorComponent],
})
export class CheckoutOrchestratorModule {}
