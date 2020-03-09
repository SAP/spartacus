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
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutStepType } from '../../model/index';
import { CheckoutConfigService } from '../../services/index';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';

@Component({
  selector: 'cx-review-submit',
  templateUrl: './review-submit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewSubmitComponent implements OnInit {
  checkoutStepType = CheckoutStepType;
  entries$: Observable<OrderEntry[]>;
  cart$: Observable<Cart>;
  deliveryMode$: Observable<DeliveryMode>;
  countryName$: Observable<string>;
  deliveryAddress$: Observable<Address>;
  paymentDetails$: Observable<PaymentDetails>;
  orderPromotions$: Observable<PromotionResult[]>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  constructor(
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected userAddressService: UserAddressService,
    protected activeCartService: ActiveCartService,
    protected translation: TranslationService,
    protected checkoutConfigService: CheckoutConfigService,
    protected promotionService: PromotionService
  ) {}

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();
    this.entries$ = this.activeCartService.getEntries();
    this.deliveryAddress$ = this.checkoutDeliveryService.getDeliveryAddress();
    this.paymentDetails$ = this.checkoutPaymentService.getPaymentDetails();
    this.orderPromotions$ = this.promotionService.getOrderPromotions(
      this.promotionLocation
    );

    this.deliveryMode$ = this.checkoutDeliveryService
      .getSelectedDeliveryMode()
      .pipe(
        tap((selected: DeliveryMode) => {
          if (selected === null) {
            this.checkoutDeliveryService.loadSupportedDeliveryModes();
          }
        })
      );

    this.countryName$ = this.deliveryAddress$.pipe(
      switchMap((address: Address) =>
        this.userAddressService.getCountry(address.country.isocode)
      ),
      tap((country: Country) => {
        if (country === null) {
          this.userAddressService.loadDeliveryCountries();
        }
      }),
      map((country: Country) => country && country.name)
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
    const step = this.checkoutConfigService.getCheckoutStep(stepType);
    return step && step.routeName;
  }
}
