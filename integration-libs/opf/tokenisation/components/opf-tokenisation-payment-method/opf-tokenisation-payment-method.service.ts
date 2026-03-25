/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, Optional } from '@angular/core';
import {
  Address,
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  RoutingService,
  TranslationService,
  UserPaymentService,
  WindowRef,
  getLastValueSync,
} from '@spartacus/core';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {
  Card,
  OutletContextData,
  SelectFocusUtility,
} from '@spartacus/storefront';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  Subscription,
  of,
} from 'rxjs';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfSavedCardsToggleContext } from '@spartacus/opf/tokenisation';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { SAVED_CARDS_ID } from '@spartacus/opf/tokenisation/core';

@Injectable()
export class OpfTokenisationPaymentMethodService {
  protected userPaymentService = inject(UserPaymentService);
  protected checkoutPaymentFacade = inject(CheckoutPaymentFacade);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected busy$ = new BehaviorSubject<boolean>(false);
  protected subscriptions = new Subscription();
  protected deliveryAddress: Address | undefined;
  protected orderFacade = inject(OrderFacade);
  protected routingService = inject(RoutingService);
  protected checkoutStepService = inject(CheckoutStepService);
  protected activatedRoute = inject(ActivatedRoute);
  protected globalMessageService = inject(GlobalMessageService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected translationService = inject(TranslationService);
  protected checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );

  protected outletContextData = inject<
    OutletContextData<OpfSavedCardsToggleContext>
  >(OutletContextData as any, { optional: true });

  paymentDetails?: PaymentDetails;
  isGuestCheckout = false;

  @Optional() protected windowRef = inject(WindowRef);
  @Optional() protected focusService = inject(SelectFocusUtility);

  showSavedCards$: Observable<boolean> = this.opfMetadataStoreService
    .getOpfMetadataState()
    .pipe(
      map((state) => state?.selectedPaymentOptionId === SAVED_CARDS_ID),
      distinctUntilChanged()
    );

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

  protected selectedPaymentMethod$ = new BehaviorSubject<
    PaymentDetails | undefined
  >(undefined);

  get existingPaymentMethods$(): Observable<PaymentDetails[]> {
    return this.userPaymentService.getPaymentMethods();
  }
  // instead of reading from checkoutPaymentFacade (which depends on the backend returning paymentInfo), we are using the local subject
  get selectedMethod$(): Observable<PaymentDetails | undefined> {
    return this.selectedPaymentMethod$.asObservable();
  }

  initialize(): void {
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
  }

  getCards$(): Observable<{ content: Card; paymentMethod: PaymentDetails }[]> {
    return combineLatest([
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

  protected savePaymentMethod(paymentDetails: PaymentDetails): void {
    this.busy$.next(true);
    this.subscriptions.add(
      this.checkoutPaymentFacade.setPaymentDetails(paymentDetails).subscribe({
        complete: () => this.onSuccess(),
        error: () => this.onError(),
      })
    );
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

  protected onSuccess(): void {
    this.busy$.next(false);
  }

  protected onError(): void {
    this.busy$.next(false);
    this.selectedPaymentMethod$.next(undefined);
  }

  destroy(): void {
    this.subscriptions.unsubscribe();
  }
}
