import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveConfiguration, OpfCheckoutFacade } from '@spartacus/opf/root';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-payments',
  templateUrl: './opf-checkout-payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentsComponent implements OnInit {
  activeConfiguratons$ = this.opfCheckoutService.getActiveConfigurations().pipe(
    tap((activeConfiguratons) => {
      if (activeConfiguratons.length) {
        this.selectedPaymentId = activeConfiguratons[0].id;
      }
    })
  );

  selectedPaymentId?: number;

  constructor(private opfCheckoutService: OpfCheckoutFacade) {}

  ngOnInit(): void {}

  changePayment(payment: ActiveConfiguration): void {
    this.selectedPaymentId = payment.id;
  }
}
