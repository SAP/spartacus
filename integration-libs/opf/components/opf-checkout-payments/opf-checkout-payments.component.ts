import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OpfCheckoutFacade } from '@spartacus/opf/root';

@Component({
  selector: 'cx-opf-checkout-payments',
  templateUrl: './opf-checkout-payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentsComponent implements OnInit {
  activeConfiguratons$ = this.opfCheckoutService.getActiveConfigurations();

  constructor(private opfCheckoutService: OpfCheckoutFacade) {}

  ngOnInit(): void {}
}
