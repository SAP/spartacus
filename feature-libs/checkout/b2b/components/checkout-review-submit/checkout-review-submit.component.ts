import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutReviewSubmitComponent,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  CostCenter,
  PaymentType,
  TranslationService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-review-submit',
  templateUrl: './checkout-review-submit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BCheckoutReviewSubmitComponent extends CheckoutReviewSubmitComponent {
  checkoutStepTypePaymentType = CheckoutStepType.PAYMENT_TYPE;

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected activeCartService: ActiveCartService,
    protected translationService: TranslationService,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected userCostCenterService: UserCostCenterService
  ) {
    super(
      checkoutDeliveryAddressFacade,
      checkoutPaymentFacade,
      activeCartService,
      translationService,
      checkoutStepService,
      checkoutDeliveryModesFacade
    );
  }

  get poNumber$(): Observable<string | undefined> {
    return this.checkoutPaymentTypeFacade.getPurchaseOrderNumberState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );
  }

  get paymentType$(): Observable<PaymentType | undefined> {
    return this.checkoutPaymentTypeFacade.getSelectedPaymentTypeState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );
  }

  get isAccountPayment$(): Observable<boolean> {
    return this.checkoutPaymentTypeFacade.isAccountPayment();
  }

  /**
   *  TODO:#checkout - since the `getCostCenterState` returns the actual cost center,
   * there's no need to use userCostCenterService.getActiveCostCenters()?
   */
  get costCenter$(): Observable<CostCenter | undefined> {
    return this.userCostCenterService.getActiveCostCenters().pipe(
      filter((costCenters) => !!costCenters),
      switchMap((costCenters) =>
        this.checkoutCostCenterFacade
          .getCostCenterState()
          .pipe(
            map((state) =>
              costCenters.find((cc) => cc.code === state?.data?.code)
            )
          )
      )
    );
  }

  protected getCheckoutPaymentSteps(): Array<CheckoutStepType | string> {
    return [
      CheckoutStepType.PAYMENT_DETAILS,
      CheckoutStepType.PAYMENT_TYPE,
      CheckoutStepType.SHIPPING_ADDRESS,
    ];
  }

  getCostCenterCard(costCenter?: CostCenter): Observable<Card> {
    return combineLatest([
      this.translationService.translate('checkoutB2B.costCenter'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: costCenter?.name,
          text: ['(' + costCenter?.unit?.name + ')'],
        };
      })
    );
  }

  getPoNumberCard(poNumber?: string | null): Observable<Card> {
    return combineLatest([
      this.translationService.translate('checkoutB2B.review.poNumber'),
      this.translationService.translate('checkoutB2B.noPoNumber'),
    ]).pipe(
      map(([textTitle, noneTextTitle]) => {
        return {
          title: textTitle,
          textBold: poNumber ? poNumber : noneTextTitle,
        };
      })
    );
  }

  getPaymentTypeCard(paymentType: PaymentType): Observable<Card> {
    return combineLatest([
      this.translationService.translate('checkoutB2B.progress.methodOfPayment'),
      this.translationService.translate(
        'paymentTypes.paymentType_' + paymentType.code
      ),
    ]).pipe(
      map(([textTitle, paymentTypeTranslation]) => {
        return {
          title: textTitle,
          textBold: paymentTypeTranslation,
        };
      })
    );
  }
}
