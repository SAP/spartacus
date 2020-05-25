import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import {
  PaymentTypeService,
  UserCostCenterService,
  CostCenter,
} from '@spartacus/core';
import { CheckoutStepService } from '../../services/checkout-step.service';

@Component({
  selector: 'cx-po-number',
  templateUrl: './po-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoNumberComponent {
  readonly ACCOUNT_PAYMENT = 'ACCOUNT';

  @ViewChild('poNumber', { static: false })
  poNumberInput: ElementRef;

  typeCode: string;
  typeSelected$: Observable<
    string
  > = this.paymentTypeService.getSelectedPaymentType().pipe(
    filter((selected) => selected !== undefined),
    tap((selected) => (this.typeCode = selected))
  );

  poNumber: string;
  poNumber$: Observable<string> = this.paymentTypeService.getPoNumber().pipe(
    filter((po) => !!po),
    tap((po) => (this.poNumber = po))
  );

  costCenters$: Observable<
    CostCenter[]
  > = this.costCenterService.getActiveCostCenters();

  backBtnText = this.checkoutStepService.getBackBntText(this.activatedRoute);

  constructor(
    protected paymentTypeService: PaymentTypeService,
    protected checkoutStepService: CheckoutStepService,
    protected costCenterService: UserCostCenterService,
    protected activatedRoute: ActivatedRoute
  ) {}

  next(): void {
    const poNumInput = this.poNumberInput.nativeElement.value;
    if (this.typeCode && poNumInput !== this.poNumber) {
      this.paymentTypeService.setPaymentType(this.typeCode, poNumInput);
    }
    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }
}
