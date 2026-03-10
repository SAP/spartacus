/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  getLastValueSync,
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  RoutingService,
  TranslatePipe,
  TranslationService,
  UserPaymentService,
  WindowRef,
} from '@spartacus/core';
import {
  Card,
  CardComponent,
  ICON_TYPE,
  SelectFocusUtility,
  SpinnerComponent,
} from '@spartacus/storefront';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { Order, OrderFacade } from '@spartacus/order/root';

@Component({
  selector: 'cx-opf-tokenisation-checkout-payment-method',
  templateUrl: './opf-tokenisation-checkout-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    CardComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class OpfTokenisationCheckoutPaymentMethodComponent
  implements OnInit, OnDestroy
{
  protected subscriptions = new Subscription();
  protected deliveryAddress: Address | undefined;
  protected routingService = inject(RoutingService);
  protected userPaymentService = inject(UserPaymentService);
  protected checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );
  protected checkoutPaymentFacade = inject(CheckoutPaymentFacade);
  protected activatedRoute = inject(ActivatedRoute);
  protected translationService = inject(TranslationService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected checkoutStepService = inject(CheckoutStepService);
  protected globalMessageService = inject(GlobalMessageService);
  protected orderFacade = inject(OrderFacade);

  protected busy$ = new BehaviorSubject<boolean>(false);
  protected selectedPaymentMethod$ = new BehaviorSubject<
    PaymentDetails | undefined
  >(undefined);
  @Optional() protected focusService = inject(SelectFocusUtility);
  @Optional() protected windowRef = inject(WindowRef);

  cards$: Observable<{ content: Card; paymentMethod: PaymentDetails }[]>;
  iconTypes = ICON_TYPE;
  isGuestCheckout = false;
  doneAutoSelect = false;
  paymentDetails?: PaymentDetails;

  isUpdating$: Observable<boolean> = combineLatest([
    this.busy$,
    this.userPaymentService.getPaymentMethodsLoading(),
    this.checkoutPaymentFacade
      .getPaymentDetailsState()
      .pipe(map((state) => state.loading)),
  ]).pipe(
    map(
      ([busy, userPaymentLoading, paymentMethodLoading]) =>
        busy || userPaymentLoading || paymentMethodLoading
    ),
    distinctUntilChanged()
  );

  get existingPaymentMethods$(): Observable<PaymentDetails[]> {
    return this.userPaymentService.getPaymentMethods();
  }
  // instead of reading from checkoutPaymentFacade (which depends on the backend returning paymentInfo), we are using the local subject
  get selectedMethod$(): Observable<PaymentDetails | undefined> {
    return this.selectedPaymentMethod$.asObservable();
  }

  ngOnInit(): void {
    if (!getLastValueSync(this.activeCartFacade.isGuestCart())) {
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
      this.translationService.translate('paymentCard.selectedPayment'),
    ]).pipe(
      map(
        ([paymentMethods, selectedMethod, textUseThisPayment, textSelected]) =>
          paymentMethods.map((payment) => ({
            content: this.createCard(
              payment.payment,
              {
                textExpires: payment.expiryTranslation,
                textUseThisPayment,
                textSelected,
              },
              selectedMethod
            ),
            paymentMethod: payment.payment,
          }))
      )
    );
  }

  selectPaymentMethod(paymentDetails: PaymentDetails): void {
    if (paymentDetails?.id === this.selectedPaymentMethod$.getValue()?.id) {
      return;
    }

    this.globalMessageService.add(
      {
        key: 'paymentMethods.paymentMethodSelected',
      },
      GlobalMessageType.MSG_TYPE_INFO
    );
    this.selectedPaymentMethod$.next(paymentDetails);
    this.savePaymentMethod(paymentDetails);
    this.focusCardAfterSelecting();
  }

  /**
   * Restores the focus to the Card component after it has been selected and the checkout has finished updating.
   * The focus is lost due to DOM changes making it otherwise impossible to target elements that have been removed.
   */
  focusCardAfterSelecting(): void {
    const cardNodes = Array.from(
      this.windowRef?.document.querySelectorAll('cx-card')
    );
    const triggeredCard =
      this.windowRef?.document.activeElement?.closest('cx-card');

    if (triggeredCard) {
      const selectedCardIndex = cardNodes.indexOf(triggeredCard);
      this.isUpdating$
        .pipe(
          filter((isUpdating) => !isUpdating),
          take(1)
        )
        .subscribe(() => {
          requestAnimationFrame(() => {
            const selectedCard = this.windowRef?.document.querySelectorAll(
              'cx-card'
            )[selectedCardIndex] as HTMLElement;
            this.focusService.findFirstFocusable(selectedCard)?.focus();
          });
        });
    }
  }

  setPaymentDetails({
    paymentDetails,
    billingAddress,
  }: {
    paymentDetails: PaymentDetails;
    billingAddress?: Address;
  }): void {
    this.paymentDetails = paymentDetails;

    const details: PaymentDetails = { ...paymentDetails };
    details.billingAddress = billingAddress ?? this.deliveryAddress;
    this.busy$.next(true);
    this.subscriptions.add(
      this.checkoutPaymentFacade.createPaymentDetails(details).subscribe({
        complete: () => {
          // we don't call onSuccess here, because it can cause a spinner flickering
          this.next();
        },
        error: () => {
          this.onError();
        },
      })
    );
  }

  next(): void {
    this.busy$.next(true);
    this.subscriptions.add(
      this.orderFacade
        .placePaymentAuthorizedOrder(true)
        .pipe(
          tap((order: Order) => {
            if (order) {
              this.busy$.next(false);
              this.routingService.go({ cxRoute: 'orderConfirmation' });
            }
          })
        )
        .subscribe({
          error: () => {
            this.busy$.next(false);
          },
        })
    );
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  protected savePaymentMethod(paymentDetails: PaymentDetails): void {
    this.busy$.next(true);
    this.subscriptions.add(
      this.checkoutPaymentFacade.setPaymentDetails(paymentDetails).subscribe({
        complete: () => this.onSuccess(),
        error: () => this.onError(),
      })
    );
  }

  protected createCard(
    paymentDetails: PaymentDetails,
    cardLabels: {
      textExpires: string;
      textUseThisPayment: string;
      textSelected: string;
    },
    selected: PaymentDetails | undefined
  ): Card {
    const isSelected = selected?.id === paymentDetails.id;
    const role = !isSelected ? 'button' : 'application';

    return {
      role,
      text: [paymentDetails.cardNumber ?? '', cardLabels.textExpires],
      actions: isSelected
        ? []
        : [{ name: cardLabels.textUseThisPayment, event: 'send' }],
      header: isSelected ? cardLabels.textSelected : undefined,
      label: paymentDetails.defaultPayment
        ? 'paymentCard.defaultPaymentLabel'
        : 'paymentCard.additionalPaymentLabel',
    };
  }

  protected onSuccess(): void {
    this.busy$.next(false);
  }

  protected onError(): void {
    this.busy$.next(false);
    this.selectedPaymentMethod$.next(undefined);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
