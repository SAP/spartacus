import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Address,
  Cart,
  ActiveCartService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  Country,
  DeliveryMode,
  OrderEntry,
  PaymentDetails,
  TranslationService,
  UserAddressService,
  PromotionResult,
  PromotionLocation,
  PaymentTypeService,
  CheckoutCostCenterService,
  UserCostCenterService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { CheckoutStep } from '../../model/checkout-step.model';
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutStepType } from '../../model/index';
import { CheckoutStepService } from '../../services/index';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';

@Component({
  selector: 'cx-review-submit',
  templateUrl: './review-submit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewSubmitComponent {
  checkoutStepType = CheckoutStepType;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  constructor(
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected userAddressService: UserAddressService,
    protected activeCartService: ActiveCartService,
    protected translation: TranslationService,
    protected checkoutStepService: CheckoutStepService,
    protected promotionService: PromotionService,
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

  get costCenterName$(): Observable<string> {
    return this.userCostCenterService.getActiveCostCenters().pipe(
      filter((costCenters) => Boolean(costCenters)),
      switchMap((costCenters) => {
        return this.checkoutCostCenterService.getCostCenter().pipe(
          map((code) => {
            return costCenters.find((cc) => cc.code === code)?.name;
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

  getDeliveryModeCard(deliveryMode: DeliveryMode): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutShipping.shippingMethod'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: deliveryMode.name,
          text: [deliveryMode.description],
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
    ]).pipe(
      map(([textTitle, textExpires]) => {
        return {
          title: textTitle,
          textBold: paymentDetails.accountHolderName,
          text: [paymentDetails.cardNumber, textExpires],
        };
      })
    );
  }

  getPoNumberCard(poNumber: string, costCenter: string): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutProgress.poNumber'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: poNumber,
          text: [costCenter ? 'cost center: ' + costCenter : ''],
        };
      })
    );
  }

  getCheckoutStepUrl(stepType: CheckoutStepType): string {
    const step = this.checkoutStepService.getCheckoutStep(stepType);
    return step && step.routeName;
  }
}
