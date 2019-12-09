import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-checkout-orchestrator',
  templateUrl: './checkout-orchestrator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrchestratorComponent {
  constructor() {}
}
