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
  CheckoutCostCenterService,
  CostCenter,
  B2BPaymentTypeEnum,
} from '@spartacus/core';
import { CheckoutStepService } from '../../services/checkout-step.service';

@Component({
  selector: 'cx-po-number',
  templateUrl: './po-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoNumberComponent {
  readonly ACCOUNT_PAYMENT = B2BPaymentTypeEnum.ACCOUNT_PAYMENT;

  @ViewChild('poNumber', { static: false })
  private _poNumberInput: ElementRef;

  private _costCenterId: string;
  set costCenterId(code: string) {
    this._costCenterId = code;
  }
  get costCenterId(): string {
    return this._costCenterId;
  }

  paymentTypeCode: string;
  cartPoNumber: string;
  cartCostCenterId: string;

  allowRedirect = true;

  constructor(
    protected paymentTypeService: PaymentTypeService,
    protected checkoutStepService: CheckoutStepService,
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterService: CheckoutCostCenterService,
    protected activatedRoute: ActivatedRoute
  ) {}

  get typeSelected$(): Observable<string> {
    return this.paymentTypeService
      .getSelectedPaymentType()
      .pipe(tap((selected) => (this.paymentTypeCode = selected)));
  }

  get cartPoNumber$(): Observable<string> {
    return this.paymentTypeService.getPoNumber().pipe(
      filter((po) => po !== undefined),
      tap((po) => (this.cartPoNumber = po))
    );
  }

  get costCenters$(): Observable<CostCenter[]> {
    return this.userCostCenterService.getActiveCostCenters().pipe(
      filter((costCenters) => costCenters && costCenters.length > 0),
      tap((costCenters) => {
        if (this._costCenterId === undefined) {
          this._costCenterId = costCenters[0].code;
        }
      })
    );
  }

  get cartCostCenter$(): Observable<string> {
    return this.checkoutCostCenterService.getCostCenter().pipe(
      filter((cc) => Boolean(cc)),
      tap((cc) => {
        this.cartCostCenterId = cc;
        if (
          this._costCenterId === this.cartCostCenterId &&
          !this.allowRedirect
        ) {
          this.allowRedirect = true;
          this.checkoutStepService.next(this.activatedRoute);
        }
      })
    );
  }

  get backBtnText(): string {
    return this.checkoutStepService.getBackBntText(this.activatedRoute);
  }

  next(): void {
    // set po number to cart
    const poNumInput = this._poNumberInput.nativeElement.value;
    if (this.paymentTypeCode && poNumInput !== this.cartPoNumber) {
      this.paymentTypeService.setPaymentType(this.paymentTypeCode, poNumInput);
    }

    // set cost center to cart
    if (
      this.paymentTypeCode === this.ACCOUNT_PAYMENT &&
      this._costCenterId &&
      this._costCenterId !== this.cartCostCenterId
    ) {
      this.allowRedirect = false;
      this.checkoutCostCenterService.setCostCenter(this._costCenterId);
    }

    if (this.allowRedirect) {
      this.checkoutStepService.next(this.activatedRoute);
    }
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }
}
