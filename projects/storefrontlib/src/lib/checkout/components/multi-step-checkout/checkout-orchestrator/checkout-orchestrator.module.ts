import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutOrchestratorComponent } from './checkout-orchestrator.component';
import { ConfigModule, CmsConfig, Config } from '@spartacus/core';
import { CheckoutGuard } from '../../../guards/checkout.guard';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { CheckoutConfig } from '../../../config/checkout-config';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultCheckoutConfig),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOrchestrator: {
          selector: 'cx-checkout-orchestrator',
          guards: [CheckoutGuard],
        },
      },
    }),
  ],
  providers: [CheckoutGuard, { provide: CheckoutConfig, useExisting: Config }],
  declarations: [CheckoutOrchestratorComponent],
  entryComponents: [CheckoutOrchestratorComponent],
  exports: [CheckoutOrchestratorComponent],
})
export class CheckoutOrchestratorModule {}
