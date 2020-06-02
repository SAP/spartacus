import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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

  deliveryMode$: Observable<DeliveryMode>;
  countryName$: Observable<string>;

  paymentDetails$: Observable<PaymentDetails>;
  orderPromotions$: Observable<PromotionResult[]>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  constructor(
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected userAddressService: UserAddressService,
    protected activeCartService: ActiveCartService,
    protected translation: TranslationService,
    protected checkoutStepService: CheckoutStepService,
    protected promotionService: PromotionService
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

  getShippingAddressCard(
    deliveryAddress: Address,
    countryName: string
  ): Observable<Card> {
    return combineLatest([
      this.translation.translate('addressCard.shipTo'),
    ]).pipe(
      map(([textTitle]) => {
        if (!countryName) {
          countryName = deliveryAddress.country.isocode;
        }

        let region = '';
        if (deliveryAddress.region && deliveryAddress.region.isocode) {
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

  getCheckoutStepUrl(stepType: CheckoutStepType): string {
    const step = this.checkoutStepService.getCheckoutStep(stepType);
    return step && step.routeName;
  }
}
