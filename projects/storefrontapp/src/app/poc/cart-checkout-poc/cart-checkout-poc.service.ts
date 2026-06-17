/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  CartAccessCodeFacade,
  CartGuestUserFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { getCartIdByUserId } from '@spartacus/cart/base/core';
import { CheckoutPaymentTypeConnector } from '@spartacus/checkout/b2b/core';
import { B2BPaymentTypeEnum } from '@spartacus/checkout/b2b/root';
import {
  CheckoutBillingAddressConnector,
  CheckoutConnector,
  CheckoutDeliveryAddressConnector,
  CheckoutDeliveryModesConnector,
} from '@spartacus/checkout/base/core';
import {
  Address,
  AuthService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  OpfPaymentConnector,
  encodeOpfGooglePayEncryptedToken,
  getBrowserInfo,
} from '@spartacus/opf/payment/core';
import {
  OpfPaymentChannel,
  OpfPaymentSubmitRequest,
  OpfPaymentSubmitStatus,
} from '@spartacus/opf/payment/root';
import { OpfQuickBuyProviderType } from '@spartacus/opf/quick-buy/root';
import { OpfGooglePayService } from '@spartacus/opf/quick-buy/components';
import type { GooglePayWalletAuthorization } from '@spartacus/opf/quick-buy/components';
import { OrderConnector } from '@spartacus/order/core';
import { Order } from '@spartacus/order/root';
import { Observable, combineLatest, forkJoin, of, throwError } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  CartCheckoutPocResult,
  CartCheckoutPocStep,
} from './cart-checkout-poc.model';

const DEFAULT_PRODUCT_CODE = '300938';

const SAMPLE_DELIVERY_ADDRESS: Address = {
  titleCode: 'mr',
  firstName: 'Quick',
  lastName: 'BuyPoc',
  line1: '100 Fifth Avenue',
  line2: 'Apt 123',
  town: 'New York',
  postalCode: '10001',
  country: { isocode: 'US' },
  region: { isocode: 'US-NY' },
};

const SAMPLE_GUEST_EMAIL = 'quick-buy-poc@example.com';

@Injectable()
export class CartCheckoutPocService {
  protected multiCartFacade = inject(MultiCartFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected userIdService = inject(UserIdService);
  protected authService = inject(AuthService);
  protected cartAccessCodeFacade = inject(CartAccessCodeFacade);
  protected cartGuestUserFacade = inject(CartGuestUserFacade);
  protected winRef = inject(WindowRef);
  protected checkoutDeliveryAddressConnector = inject(
    CheckoutDeliveryAddressConnector
  );
  protected checkoutDeliveryModesConnector = inject(
    CheckoutDeliveryModesConnector
  );
  protected checkoutBillingAddressConnector = inject(
    CheckoutBillingAddressConnector
  );
  protected checkoutPaymentTypeConnector = inject(CheckoutPaymentTypeConnector, {
    optional: true,
  });
  protected opfPaymentConnector = inject(OpfPaymentConnector);
  protected checkoutConnector = inject(CheckoutConnector);
  protected orderConnector = inject(OrderConnector);
  protected opfGooglePayService = inject(OpfGooglePayService);

  runPoc(productCode = DEFAULT_PRODUCT_CODE): Observable<CartCheckoutPocResult> {
    const steps = this.createInitialSteps();
    const updateStep = this.createStepUpdater(steps);

    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
    ]).pipe(
      take(1),
      switchMap(([userId, activeCartId]): Observable<CartCheckoutPocResult> => {
        updateStep('create-cart', 'running');

        return this.multiCartFacade
          .createCart({ userId, extraData: { active: false } })
          .pipe(
            take(1),
            switchMap((cart) =>
              this.runCheckoutOnTargetCart(
                userId,
                activeCartId,
                cart,
                productCode,
                steps,
                updateStep
              )
            ),
            catchError((error: Error) => {
              const failedStep = steps.find((step) => step.status === 'running');
              if (failedStep) {
                updateStep(failedStep.id, 'error', error.message);
              } else {
                updateStep('create-cart', 'error', error.message);
              }

              return of({
                activeCartId,
                targetCartId: '',
                activeCartUnchanged: true,
                steps,
              });
            })
          );
      })
    );
  }

  protected runCheckoutOnTargetCart(
    userId: string,
    activeCartId: string,
    cart: Cart,
    productCode: string,
    steps: CartCheckoutPocStep[],
    updateStep: ReturnType<CartCheckoutPocService['createStepUpdater']>
  ): Observable<CartCheckoutPocResult> {
    const targetCartId = getCartIdByUserId(cart, userId);
    updateStep(
      'create-cart',
      'success',
      `Created cart ${targetCartId} (active cart: ${activeCartId})`
    );

    updateStep('add-product', 'running');
    this.multiCartFacade.addEntry(userId, targetCartId, productCode, 1);

    return this.waitForStableCart(targetCartId).pipe(
      switchMap(() => this.multiCartFacade.getCart(targetCartId).pipe(take(1))),
      tap((updatedCart) => {
        const entryCount = updatedCart.entries?.length ?? 0;
        updateStep(
          'add-product',
          entryCount > 0 ? 'success' : 'error',
          entryCount > 0
            ? `Added ${productCode} (${entryCount} entr${
                entryCount === 1 ? 'y' : 'ies'
              })`
            : `No entries on cart ${targetCartId}`
        );
      }),
      switchMap((): Observable<string> =>
        this.assignDeliveryAddress(userId, targetCartId, updateStep)
      ),
      switchMap((): Observable<string> =>
        this.setDeliveryMode(userId, targetCartId, updateStep)
      ),
      switchMap((): Observable<void> =>
        this.setBillingAddress(userId, targetCartId, updateStep)
      ),
      switchMap((): Observable<void> =>
        this.setPaymentType(userId, targetCartId, updateStep)
      ),
      switchMap((): Observable<void> =>
        this.ensureCartGuestUser(userId, targetCartId, updateStep)
      ),
      switchMap((): Observable<Cart> =>
        this.multiCartFacade.getCart(targetCartId).pipe(take(1))
      ),
      switchMap((targetCart) => {
        updateStep(
          'opf-authorize-payment',
          'running',
          'Opening Google Pay wallet (same as Quick Buy)…'
        );
        return this.opfGooglePayService.requestWalletTokenForCart(targetCart);
      }),
      switchMap((walletAuth) =>
        this.applyGooglePayWalletDataToTargetCart(
          userId,
          targetCartId,
          walletAuth
        ).pipe(map(() => walletAuth.token))
      ),
      switchMap((walletToken) =>
        this.authorizeOpfPayment(
          userId,
          targetCartId,
          updateStep,
          walletToken
        )
      ),
      switchMap((): Observable<void> =>
        this.loadCheckoutDetails(userId, targetCartId, updateStep)
      ),
      switchMap((): Observable<Order | null> =>
        this.placeAuthorizedOrder(userId, targetCartId, updateStep)
      ),
      switchMap(
        (): Observable<CartCheckoutPocResult> =>
          this.activeCartFacade.takeActiveCartId().pipe(
            take(1),
            map(
              (currentActiveCartId): CartCheckoutPocResult => ({
                activeCartId,
                targetCartId,
                activeCartUnchanged: currentActiveCartId === activeCartId,
                steps,
              })
            )
          )
      )
    ) as Observable<CartCheckoutPocResult>;
  }

  protected createInitialSteps(): CartCheckoutPocStep[] {
    return [
      { id: 'create-cart', label: 'Create non-active cart', status: 'pending' },
      { id: 'add-product', label: 'Add product to target cart', status: 'pending' },
      {
        id: 'delivery-address',
        label: 'Assign delivery address (target cartId)',
        status: 'pending',
      },
      {
        id: 'delivery-mode',
        label: 'Set delivery mode (target cartId)',
        status: 'pending',
      },
      {
        id: 'billing-address',
        label: 'Assign billing address (target cartId)',
        status: 'pending',
      },
      {
        id: 'payment-type',
        label: 'Set payment type (target cartId)',
        status: 'pending',
      },
      {
        id: 'cart-guest-user',
        label: 'Ensure cart guest user (target cartId)',
        status: 'pending',
      },
      {
        id: 'opf-authorize-payment',
        label: 'OPF authorize payment (Quick Buy / Google Pay flow)',
        status: 'pending',
      },
      {
        id: 'checkout-details',
        label: 'Load checkout details (target cartId)',
        status: 'pending',
      },
      {
        id: 'place-authorized-order',
        label: 'Place payment-authorized order (target cartId)',
        status: 'pending',
      },
    ];
  }

  protected createStepUpdater(
    steps: CartCheckoutPocStep[]
  ): (id: string, status: CartCheckoutPocStep['status'], message?: string) => void {
    return (id, status, message) => {
      const step = steps.find((item) => item.id === id);
      if (step) {
        step.status = status;
        step.message = message;
      }
    };
  }

  protected waitForStableCart(cartId: string): Observable<boolean> {
    return this.multiCartFacade.isStable(cartId).pipe(
      filter((isStable) => isStable),
      take(1)
    );
  }

  protected assignDeliveryAddress(
    userId: string,
    cartId: string,
    updateStep: ReturnType<CartCheckoutPocService['createStepUpdater']>
  ): Observable<string> {
    updateStep('delivery-address', 'running');

    return this.checkoutDeliveryAddressConnector
      .createAddress(userId, cartId, SAMPLE_DELIVERY_ADDRESS)
      .pipe(
        tap((address) => {
          updateStep(
            'delivery-address',
            'success',
            `Delivery address ${address.id ?? '(created)'} on cart ${cartId}`
          );
        }),
        map((address) => address.id ?? ''),
        catchError((error: Error) => {
          updateStep('delivery-address', 'error', error.message);
          throw error;
        })
      );
  }

  protected setDeliveryMode(
    userId: string,
    cartId: string,
    updateStep: ReturnType<CartCheckoutPocService['createStepUpdater']>
  ): Observable<string> {
    updateStep('delivery-mode', 'running');

    return this.checkoutDeliveryModesConnector
      .getSupportedModes(userId, cartId)
      .pipe(
        switchMap((modes) => {
          const deliveryModeId = modes[0]?.code;
          if (!deliveryModeId) {
            throw new Error('No supported delivery modes for target cart');
          }

          return this.checkoutDeliveryModesConnector
            .setMode(userId, cartId, deliveryModeId)
            .pipe(map(() => deliveryModeId));
        }),
        tap((deliveryModeId) => {
          updateStep(
            'delivery-mode',
            'success',
            `Delivery mode ${deliveryModeId} on cart ${cartId}`
          );
        }),
        catchError((error: Error) => {
          updateStep('delivery-mode', 'error', error.message);
          throw error;
        })
      );
  }

  protected setBillingAddress(
    userId: string,
    cartId: string,
    updateStep: ReturnType<CartCheckoutPocService['createStepUpdater']>
  ): Observable<void> {
    updateStep('billing-address', 'running');

    return this.checkoutBillingAddressConnector
      .setBillingAddress(userId, cartId, SAMPLE_DELIVERY_ADDRESS)
      .pipe(
        tap(() => {
          updateStep(
            'billing-address',
            'success',
            `Billing address assigned on cart ${cartId}`
          );
        }),
        map(() => void 0),
        catchError((error: Error) => {
          updateStep('billing-address', 'error', error.message);
          throw error;
        })
      );
  }

  protected setPaymentType(
    userId: string,
    cartId: string,
    updateStep: ReturnType<CartCheckoutPocService['createStepUpdater']>
  ): Observable<void> {
    updateStep('payment-type', 'running');

    if (!environment.b2b || !this.checkoutPaymentTypeConnector) {
      updateStep(
        'payment-type',
        'success',
        'Skipped for B2C (card payment via payment details)'
      );
      return of(void 0);
    }

    return this.checkoutPaymentTypeConnector.getPaymentTypes().pipe(
      switchMap((paymentTypes) => {
        const paymentTypeCode =
          paymentTypes.find(
            (type) => type.code === B2BPaymentTypeEnum.CARD_PAYMENT
          )?.code ?? paymentTypes[0]?.code;

        if (!paymentTypeCode) {
          throw new Error('No payment types available for target cart');
        }

        return this.checkoutPaymentTypeConnector!.setPaymentType(
          userId,
          cartId,
          paymentTypeCode
        ).pipe(map(() => paymentTypeCode));
      }),
      tap((paymentTypeCode) => {
        updateStep(
          'payment-type',
          'success',
          `Payment type ${paymentTypeCode} on cart ${cartId}`
        );
      }),
      map(() => void 0),
      catchError((error: Error) => {
        updateStep('payment-type', 'error', error.message);
        throw error;
      })
    );
  }

  protected ensureCartGuestUser(
    userId: string,
    cartId: string,
    updateStep: ReturnType<CartCheckoutPocService['createStepUpdater']>
  ): Observable<void> {
    updateStep('cart-guest-user', 'running');

    return this.authService.isUserLoggedIn().pipe(
      take(1),
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          updateStep(
            'cart-guest-user',
            'success',
            'Skipped for logged-in user'
          );
          return of(void 0);
        }

        return this.cartGuestUserFacade
          .createCartGuestUser(userId, cartId, { email: SAMPLE_GUEST_EMAIL })
          .pipe(
            tap(() => this.multiCartFacade.reloadCart(cartId)),
            tap(() => {
              updateStep(
                'cart-guest-user',
                'success',
                `Guest user ${SAMPLE_GUEST_EMAIL} on cart ${cartId}`
              );
            }),
            map(() => void 0)
          );
      }),
      catchError((error: Error) => {
        updateStep('cart-guest-user', 'error', error.message);
        throw error;
      })
    );
  }

  protected applyGooglePayWalletDataToTargetCart(
    userId: string,
    cartId: string,
    walletAuth: GooglePayWalletAuthorization
  ): Observable<void> {
    const { paymentData } = walletAuth;
    const updates: Observable<unknown>[] = [];

    const billingAddress =
      paymentData.paymentMethodData?.info?.billingAddress;
    if (billingAddress) {
      updates.push(
        this.checkoutBillingAddressConnector.setBillingAddress(
          userId,
          cartId,
          this.opfGooglePayService.toSpartacusAddress(billingAddress)
        )
      );
    }

    if (paymentData.email) {
      updates.push(
        this.authService.isUserLoggedIn().pipe(
          take(1),
          switchMap((isLoggedIn) => {
            if (isLoggedIn) {
              return of(void 0);
            }

            return this.cartGuestUserFacade
              .updateCartGuestUser(userId, cartId, {
                email: paymentData.email,
              })
              .pipe(map(() => void 0));
          })
        )
      );
    }

    if (!updates.length) {
      return of(void 0);
    }

    return forkJoin(updates).pipe(
      tap(() => this.multiCartFacade.reloadCart(cartId)),
      switchMap(() => this.waitForStableCart(cartId)),
      map(() => void 0)
    );
  }

  protected authorizeOpfPayment(
    userId: string,
    cartId: string,
    updateStep: ReturnType<CartCheckoutPocService['createStepUpdater']>,
    googlePayToken?: string
  ): Observable<void> {
    updateStep('opf-authorize-payment', 'running');

    const walletToken = googlePayToken?.trim();
    if (!walletToken) {
      const error = new Error('Google Pay wallet token was not returned');
      updateStep('opf-authorize-payment', 'error', error.message);
      return throwError(() => error);
    }

    const submitRequest: OpfPaymentSubmitRequest = {
      paymentMethod: OpfQuickBuyProviderType.GOOGLE_PAY,
      channel: OpfPaymentChannel.BROWSER,
      browserInfo: getBrowserInfo(this.winRef.nativeWindow),
      additionalData: [],
      encryptedToken: encodeOpfGooglePayEncryptedToken(walletToken),
    };

    return this.cartAccessCodeFacade.getCartAccessCode(userId, cartId).pipe(
      switchMap((accessCodeData) => {
        const accessCode = this.resolveCartAccessCode(accessCodeData);
        if (!accessCode) {
          throw new Error('Cart access code not available for target cart');
        }

        return this.opfPaymentConnector.submitPayment(
          submitRequest,
          accessCode,
          ''
        );
      }),
      switchMap((response) => {
        if (
          response.status === OpfPaymentSubmitStatus.ACCEPTED ||
          response.status === OpfPaymentSubmitStatus.DELAYED
        ) {
          updateStep(
            'opf-authorize-payment',
            'success',
            `OPF payment ${response.status} for cart ${cartId}`
          );
          return of(void 0);
        }

        throw new Error(
          `OPF payment ${response.status}: ${response.reasonCode ?? 'unknown'}`
        );
      }),
      catchError((error: unknown) => {
        const message = this.formatOpfPaymentError(error);
        updateStep('opf-authorize-payment', 'error', message);
        throw error;
      })
    );
  }

  protected formatOpfPaymentError(error: unknown): string {
    const fallback =
      error instanceof Error ? error.message : 'OPF payment submit failed';

    const details = (error as { error?: { message?: string } })?.error;
    if (!details?.message) {
      return fallback;
    }

    try {
      const parsed = JSON.parse(details.message) as {
        status?: string;
        reasonCode?: string;
        authorizedAmount?: number;
      };
      return `OPF payment ${parsed.status ?? 'failed'}: ${
        parsed.reasonCode ?? details.message
      }${parsed.authorizedAmount ? ` (amount ${parsed.authorizedAmount})` : ''}`;
    } catch {
      return details.message;
    }
  }

  protected resolveCartAccessCode(
    accessCodeData: string | { accessCode?: string } | undefined
  ): string | undefined {
    if (typeof accessCodeData === 'string') {
      return accessCodeData;
    }

    return accessCodeData?.accessCode;
  }

  protected loadCheckoutDetails(
    userId: string,
    cartId: string,
    updateStep: ReturnType<CartCheckoutPocService['createStepUpdater']>
  ): Observable<void> {
    updateStep('checkout-details', 'running');

    return this.checkoutConnector.getCheckoutDetails(userId, cartId).pipe(
      tap((details) => {
        const hasDeliveryAddress = Boolean(details.deliveryAddress?.id);
        const hasDeliveryMode = Boolean(details.deliveryMode?.code);
        updateStep(
          'checkout-details',
          hasDeliveryAddress && hasDeliveryMode ? 'success' : 'error',
          `deliveryAddress=${details.deliveryAddress?.id ?? 'none'}, deliveryMode=${
            details.deliveryMode?.code ?? 'none'
          }, paymentInfo=${details.paymentInfo?.id ?? 'opf-authorized'}`
        );
      }),
      map(() => void 0),
      catchError((error: Error) => {
        updateStep('checkout-details', 'error', error.message);
        throw error;
      })
    );
  }

  protected placeAuthorizedOrder(
    userId: string,
    cartId: string,
    updateStep: ReturnType<CartCheckoutPocService['createStepUpdater']>
  ): Observable<Order | null> {
    updateStep('place-authorized-order', 'running');

    return this.orderConnector.placePaymentAuthorizedOrder(userId, cartId, true).pipe(
      tap((order) => {
        updateStep(
          'place-authorized-order',
          'success',
          `Order ${order.code ?? '(placed)'} from cart ${cartId}`
        );
      }),
      catchError((error: Error) => {
        updateStep('place-authorized-order', 'error', error.message);
        return of(null);
      })
    );
  }
}
