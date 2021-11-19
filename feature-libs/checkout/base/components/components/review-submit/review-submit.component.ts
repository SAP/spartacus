import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Address,
  Cart,
  Country,
  DeliveryMode,
  OrderEntry,
  PaymentDetails,
  PromotionLocation,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
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
    protected checkoutDeliveryAddressService: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected userAddressService: UserAddressService,
    protected activeCartService: ActiveCartService,
    protected translation: TranslationService,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesService: CheckoutDeliveryModesFacade
  ) {}

  get cart$(): Observable<Cart> {
    return this.activeCartService.getActive();
  }

  get entries$(): Observable<OrderEntry[]> {
    return this.activeCartService.getEntries();
  }

  protected getCheckoutShippingSteps(): Array<CheckoutStepType | string> {
    return [CheckoutStepType.SHIPPING_ADDRESS, CheckoutStepType.DELIVERY_MODE];
  }

  protected getCheckoutPaymentSteps(): Array<CheckoutStepType | string> {
    return [
      CheckoutStepType.PAYMENT_DETAILS,
      CheckoutStepType.SHIPPING_ADDRESS,
    ];
  }

  steps$: Observable<CheckoutStep[]> = this.checkoutStepService.steps$;

  deliveryAddress$: Observable<Address | undefined> =
    this.checkoutDeliveryAddressService.getDeliveryAddressState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );

  deliveryMode$: Observable<DeliveryMode | undefined> =
    this.checkoutDeliveryModesService.getSelectedDeliveryModeState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );

  paymentDetails$: Observable<PaymentDetails | undefined> =
    this.checkoutPaymentService.getPaymentDetailsState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );

  get countryName$(): Observable<string | undefined> {
    return this.deliveryAddress$.pipe(
      switchMap((address: Address | undefined) =>
        this.userAddressService.getCountry(address?.country?.isocode as string)
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
    countryName?: string
  ): Observable<Card> {
    return this.translation.translate('addressCard.shipTo').pipe(
      map((textTitle) => {
        if (!countryName) {
          countryName = deliveryAddress?.country?.name as string;
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
        } as Card;
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
        } as Card;
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
        } as Card;
      })
    );
  }

  getCheckoutStepUrl(stepType: CheckoutStepType | string): string | undefined {
    const step = this.checkoutStepService.getCheckoutStep(
      stepType as CheckoutStepType
    );
    return step?.routeName;
  }

  shippingSteps(steps: CheckoutStep[]): CheckoutStep[] {
    return steps.filter((step) =>
      this.getCheckoutShippingSteps().includes(step.type[0])
    );
  }

  paymentSteps(steps: CheckoutStep[]): CheckoutStep[] {
    return steps.filter((step) =>
      this.getCheckoutPaymentSteps().includes(step.type[0])
    );
  }
}
