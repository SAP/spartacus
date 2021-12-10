import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Address,
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutStepService } from '../services/checkout-step.service';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './checkout-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPaymentMethodComponent implements OnInit, OnDestroy {
  protected subscriptions = new Subscription();

  iconTypes = ICON_TYPE;
  existingPaymentMethods$: Observable<PaymentDetails[]>;
  isLoading$: Observable<boolean>;
  cards$: Observable<{ content: Card; paymentMethod: PaymentDetails }[]>;
  selectedMethod$: Observable<PaymentDetails | undefined>;
  isGuestCheckout = false;
  newPaymentFormManuallyOpened = false;
  paymentSavingInProgress$ = new BehaviorSubject<boolean>(false);
  shouldRedirect: boolean;

  backBtnText = this.checkoutStepService.getBackBntText(this.activatedRoute);

  protected deliveryAddress: Address | undefined;

  constructor(
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected activatedRoute: ActivatedRoute,
    protected translationService: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.shouldRedirect = false;
    this.isLoading$ = this.userPaymentService.getPaymentMethodsLoading();

    if (!this.activeCartService.isGuestCart()) {
      this.userPaymentService.loadPaymentMethods();
    } else {
      this.isGuestCheckout = true;
    }

    this.checkoutDeliveryAddressFacade
      .getDeliveryAddressState()
      .pipe(
        filter((state) => !state.loading),
        take(1),
        map((state) => state.data)
      )
      .subscribe((address) => {
        this.deliveryAddress = address;
      });

    this.existingPaymentMethods$ = this.userPaymentService.getPaymentMethods();

    this.selectedMethod$ = this.checkoutPaymentFacade
      .getPaymentDetailsState()
      .pipe(
        filter((state) => !state.loading),
        map((state) => state.data),
        tap((paymentInfo) => {
          if (paymentInfo && !!Object.keys(paymentInfo).length) {
            if (this.shouldRedirect) {
              this.next();
            }
          }
        })
      );

    this.cards$ = combineLatest([
      this.existingPaymentMethods$.pipe(
        switchMap((methods) => {
          return !methods?.length
            ? of([])
            : combineLatest(
                methods.map((method) =>
                  combineLatest([
                    of(method),
                    this.translationService.translate('paymentCard.expires', {
                      month: method.expiryMonth,
                      year: method.expiryYear,
                    }),
                  ]).pipe(
                    map(([payment, translation]) => ({
                      payment,
                      expiryTranslation: translation,
                    }))
                  )
                )
              );
        })
      ),
      this.selectedMethod$,
      this.translationService.translate('paymentForm.useThisPayment'),
      this.translationService.translate('paymentCard.defaultPaymentMethod'),
      this.translationService.translate('paymentCard.selected'),
    ]).pipe(
      map(
        ([
          paymentMethods,
          selectedMethod,
          textUseThisPayment,
          textDefaultPaymentMethod,
          textSelected,
        ]) => {
          if (
            paymentMethods.length &&
            (!selectedMethod || Object.keys(selectedMethod).length === 0)
          ) {
            const defaultPaymentMethod = paymentMethods.find(
              (paymentMethod) => paymentMethod.payment.defaultPayment
            );
            if (defaultPaymentMethod) {
              selectedMethod = defaultPaymentMethod.payment;
              this.savePaymentMethod(selectedMethod);
            }
          }
          return paymentMethods.map((payment) => ({
            content: this.createCard(
              payment.payment,
              {
                textExpires: payment.expiryTranslation,
                textUseThisPayment,
                textDefaultPaymentMethod,
                textSelected,
              },
              selectedMethod
            ),
            paymentMethod: payment.payment,
          }));
        }
      )
    );
  }

  selectPaymentMethod(paymentDetails: PaymentDetails): void {
    this.globalMessageService.add(
      {
        key: 'paymentMethods.paymentMethodSelected',
      },
      GlobalMessageType.MSG_TYPE_INFO
    );

    this.savePaymentMethod(paymentDetails);
  }

  protected savePaymentMethod(paymentDetails: PaymentDetails): void {
    this.paymentSavingInProgress$.next(true);
    this.subscriptions.add(
      this.checkoutPaymentFacade.setPaymentDetails(paymentDetails).subscribe({
        complete: () => this.paymentSavingInProgress$.next(false),
        error: () => this.paymentSavingInProgress$.next(false),
      })
    );
  }

  showNewPaymentForm(): void {
    this.newPaymentFormManuallyOpened = true;
  }

  hideNewPaymentForm(): void {
    this.newPaymentFormManuallyOpened = false;
  }

  setPaymentDetails({
    paymentDetails,
    billingAddress,
  }: {
    paymentDetails: PaymentDetails;
    billingAddress?: Address;
  }): void {
    const details: PaymentDetails = { ...paymentDetails };
    details.billingAddress = billingAddress || this.deliveryAddress;
    this.paymentSavingInProgress$.next(true);
    this.subscriptions.add(
      this.checkoutPaymentFacade.createPaymentDetails(details).subscribe({
        complete: () => {
          this.paymentSavingInProgress$.next(false);
          this.shouldRedirect = true;
        },
        error: () => {
          this.paymentSavingInProgress$.next(false);
          this.shouldRedirect = false;
        },
      })
    );
  }

  protected getCardIcon(code: string): string {
    let ccIcon: string;
    if (code === 'visa') {
      ccIcon = this.iconTypes.VISA;
    } else if (code === 'master' || code === 'mastercard_eurocard') {
      ccIcon = this.iconTypes.MASTER_CARD;
    } else if (code === 'diners') {
      ccIcon = this.iconTypes.DINERS_CLUB;
    } else if (code === 'amex') {
      ccIcon = this.iconTypes.AMEX;
    } else {
      ccIcon = this.iconTypes.CREDIT_CARD;
    }

    return ccIcon;
  }

  protected createCard(
    paymentDetails: PaymentDetails,
    cardLabels: {
      textDefaultPaymentMethod: string;
      textExpires: string;
      textUseThisPayment: string;
      textSelected: string;
    },
    selected: PaymentDetails | undefined
  ): Card {
    return {
      title: paymentDetails.defaultPayment
        ? cardLabels.textDefaultPaymentMethod
        : '',
      textBold: paymentDetails.accountHolderName,
      text: [paymentDetails.cardNumber ?? '', cardLabels.textExpires],
      img: this.getCardIcon(paymentDetails.cardType?.code as string),
      actions: [{ name: cardLabels.textUseThisPayment, event: 'send' }],
      header:
        selected?.id === paymentDetails.id
          ? cardLabels.textSelected
          : undefined,
    };
  }

  next(): void {
    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.paymentSavingInProgress$.next(false);
  }
}
