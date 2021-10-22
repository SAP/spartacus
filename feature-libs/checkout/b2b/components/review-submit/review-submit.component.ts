import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutStepService,
  ReviewSubmitComponent,
} from '@spartacus/checkout/components';
import {
  CheckoutDeliveryFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CostCenter,
  FeatureConfigService,
  PaymentType,
  TranslationService,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-review-submit',
  templateUrl: './review-submit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BReviewSubmitComponent extends ReviewSubmitComponent {
  constructor(
    protected checkoutDeliveryService: CheckoutDeliveryFacade,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected userAddressService: UserAddressService,
    protected activeCartService: ActiveCartService,
    protected translation: TranslationService,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutPaymentTypeService: CheckoutPaymentTypeFacade,
    protected checkoutCostCenterService: CheckoutCostCenterFacade,
    protected checkoutDeliveryModesService: CheckoutDeliveryModesFacade,
    protected userCostCenterService: UserCostCenterService,
    protected featureConfigService: FeatureConfigService
  ) {
    super(
      checkoutDeliveryService,
      checkoutPaymentService,
      userAddressService,
      activeCartService,
      translation,
      checkoutStepService,
      userCostCenterService,
      checkoutDeliveryModesService,
      featureConfigService
    );
  }

  get poNumber$(): Observable<string | undefined> {
    return this.checkoutPaymentTypeService.getPurchaseOrderNumber();
  }

  get paymentType$(): Observable<PaymentType | undefined> {
    return this.checkoutPaymentTypeService.getSelectedPaymentType();
  }

  get isAccountPayment$(): Observable<boolean> {
    return this.checkoutPaymentTypeService.isAccountPayment();
  }

  get costCenter$(): Observable<CostCenter | undefined> {
    return this.userCostCenterService.getActiveCostCenters().pipe(
      filter((costCenters) => Boolean(costCenters)),
      switchMap((costCenters) => {
        return this.checkoutCostCenterService.getCostCenter().pipe(
          map((checkoutCostCenterState) => {
            return costCenters.find(
              (cc) => cc.code === checkoutCostCenterState?.data
            );
          })
        );
      })
    );
  }

  getCostCenterCard(costCenter?: CostCenter): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutB2B.costCenter'),
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
      this.translation.translate('checkoutB2B.review.poNumber'),
      this.translation.translate('checkoutB2B.noPoNumber'),
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
      this.translation.translate('checkoutB2B.progress.methodOfPayment'),
      this.translation.translate(
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
