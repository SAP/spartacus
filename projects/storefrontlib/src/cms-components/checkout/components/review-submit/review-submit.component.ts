import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ActiveCartService,
  Address,
  Cart,
  CheckoutCostCenterService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  CostCenter,
  Country,
  DeliveryMode,
  OrderEntry,
  PaymentDetails,
  PaymentTypeService,
  PromotionLocation,
  PromotionResult,
  TranslationService,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import {
  checkoutPaymentSteps,
  checkoutShippingSteps,
  CheckoutStep,
} from '../../model/checkout-step.model';
import { CheckoutStepType } from '../../model/index';
import { CheckoutStepService } from '../../services/index';

@Component({
  selector: 'cx-review-submit',
  templateUrl: './review-submit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewSubmitComponent {
  iconTypes = ICON_TYPE;
  checkoutStepType = CheckoutStepType;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  constructor(
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected userAddressService: UserAddressService,
    protected activeCartService: ActiveCartService,
    protected translation: TranslationService,
    protected promotionService: PromotionService,
    protected checkoutStepService: CheckoutStepService,
    protected paymentTypeService: PaymentTypeService,
    protected checkoutCostCenterService: CheckoutCostCenterService,
    protected userCostCenterService: UserCostCenterService
  ) {}

  get cart$(): Observable<Cart> {
    return this.activeCartService.getActive();
  }

  get entries$(): Observable<OrderEntry[]> {
    return this.activeCartService.getEntries();
  }

  get steps$(): Observable<CheckoutStep[]> {
    return this.checkoutStepService.steps$;
  }

  get deliveryAddress$(): Observable<Address> {
    return this.checkoutDeliveryService.getDeliveryAddress();
  }

  get deliveryMode$(): Observable<DeliveryMode> {
    return this.checkoutDeliveryService.getSelectedDeliveryMode().pipe(
      tap((selected: DeliveryMode) => {
        if (selected === null) {
          this.checkoutDeliveryService.loadSupportedDeliveryModes();
        }
      })
    );
  }

  get paymentDetails$(): Observable<PaymentDetails> {
    return this.checkoutPaymentService.getPaymentDetails();
  }

  get orderPromotions$(): Observable<PromotionResult[]> {
    return this.promotionService.getOrderPromotions(this.promotionLocation);
  }

  get countryName$(): Observable<string> {
    return this.deliveryAddress$.pipe(
      switchMap((address: Address) =>
        this.userAddressService.getCountry(address?.country?.isocode)
      ),
      tap((country: Country) => {
        if (country === null) {
          this.userAddressService.loadDeliveryCountries();
        }
      }),
      map((country: Country) => country && country.name)
    );
  }

  get poNumber$(): Observable<string> {
    return this.paymentTypeService.getPoNumber();
  }

  get paymentType$(): Observable<string> {
    return this.paymentTypeService.getSelectedPaymentType();
  }

  get isAccountPayment$(): Observable<boolean> {
    return this.paymentTypeService.isAccountPayment();
  }

  get costCenter$(): Observable<CostCenter> {
    return this.userCostCenterService.getActiveCostCenters().pipe(
      filter((costCenters) => Boolean(costCenters)),
      switchMap((costCenters) => {
        return this.checkoutCostCenterService.getCostCenter().pipe(
          map((code) => {
            return costCenters.find((cc) => cc.code === code);
          })
        );
      })
    );
  }

  getShippingAddressCard(
    deliveryAddress: Address,
    countryName: string
  ): Observable<Card> {
    return combineLatest([
      this.translation.translate('addressCard.shipTo'),
    ]).pipe(
      map(([textTitle]) => {
        if (!countryName) {
          countryName = deliveryAddress?.country?.isocode;
        }

        let region = '';
        if (
          deliveryAddress &&
          deliveryAddress.region &&
          deliveryAddress.region.isocode
        ) {
          region = deliveryAddress.region.isocode + ', ';
        }

        return {
          title: textTitle,
          textBold: deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
          text: [
            deliveryAddress.line1,
            deliveryAddress.line2,
            deliveryAddress.town + ', ' + region + countryName,
            deliveryAddress.postalCode,
            deliveryAddress.phone,
          ],
        };
      })
    );
  }

  getCostCenterCard(costCenter: CostCenter): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutPO.costCenter'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: costCenter?.name,
          text: ['(' + costCenter?.unit.name + ')'],
        };
      })
    );
  }

  getDeliveryModeCard(deliveryMode: DeliveryMode): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutShipping.shippingMethod'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: deliveryMode.name,
          text: [
            deliveryMode.description,
            deliveryMode.deliveryCost?.formattedValue
              ? deliveryMode.deliveryCost?.formattedValue
              : '',
          ],
        };
      })
    );
  }

  getPaymentMethodCard(paymentDetails: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentForm.payment'),
      this.translation.translate('paymentCard.expires', {
        month: paymentDetails.expiryMonth,
        year: paymentDetails.expiryYear,
      }),
      this.translation.translate('paymentForm.billingAddress'),
    ]).pipe(
      map(([textTitle, textExpires, billingAddress]) => {
        const region = paymentDetails.billingAddress?.region?.isocode
          ? paymentDetails.billingAddress?.region?.isocode + ', '
          : '';
        return {
          title: textTitle,
          textBold: paymentDetails.accountHolderName,
          text: [paymentDetails.cardNumber, textExpires],
          paragraphs: [
            {
              title: billingAddress + ':',
              text: [
                paymentDetails.billingAddress?.firstName +
                  ' ' +
                  paymentDetails.billingAddress?.lastName,
                paymentDetails.billingAddress?.line1,
                paymentDetails.billingAddress?.town +
                  ', ' +
                  region +
                  paymentDetails.billingAddress?.country?.isocode,
                paymentDetails.billingAddress?.postalCode,
              ],
            },
          ],
        };
      })
    );
  }

  getPoNumberCard(poNumber: string): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutReview.poNumber'),
      this.translation.translate('checkoutPO.noPoNumber'),
    ]).pipe(
      map(([textTitle, noneTextTitle]) => {
        return {
          title: textTitle,
          textBold: poNumber ? poNumber : noneTextTitle,
        };
      })
    );
  }

  getPaymentTypeCard(paymentType: string): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutProgress.methodOfPayment'),
      this.translation.translate('paymentTypes.paymentType', {
        context: paymentType,
      }),
    ]).pipe(
      map(([textTitle, paymentTypeTranslation]) => {
        return {
          title: textTitle,
          textBold: paymentTypeTranslation,
        };
      })
    );
  }

  getCheckoutStepUrl(stepType: CheckoutStepType): string {
    const step = this.checkoutStepService.getCheckoutStep(stepType);
    return step && step.routeName;
  }

  shippingSteps(steps: CheckoutStep[]): CheckoutStep[] {
    return steps.filter((step) => checkoutShippingSteps.includes(step.type[0]));
  }

  paymentSteps(steps: CheckoutStep[]): CheckoutStep[] {
    return steps.filter((step) => checkoutPaymentSteps.includes(step.type[0]));
  }
}
