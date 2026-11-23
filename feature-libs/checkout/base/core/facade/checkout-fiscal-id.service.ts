/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutFiscalIdConfiguration,
  CheckoutFiscalIdFacade,
} from '@spartacus/checkout/base/root';
import {
  BaseSiteService,
  FiscalId,
  FiscalIdMode,
  UserIdService,
} from '@spartacus/core';
import { Observable, combineLatest, of } from 'rxjs';
import {
  filter,
  map,
  skipWhile,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { CheckoutFiscalIdConnector } from '../connectors/checkout-fiscal-id/checkout-fiscal-id.connector';

@Injectable()
export class CheckoutFiscalIdService implements CheckoutFiscalIdFacade {
  protected baseSiteService = inject(BaseSiteService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected connector = inject(CheckoutFiscalIdConnector);

  getConfiguration(): Observable<CheckoutFiscalIdConfiguration> {
    return this.baseSiteService.get().pipe(
      filter((site) => !!site),
      map((site) => {
        const mode = site?.baseStore?.sapFiscalIdMode;
        const rule = site?.baseStore?.sapFiscalIdRules?.[0];
        const required =
          mode === FiscalIdMode.REQUIRED_STRICT ||
          mode === FiscalIdMode.REQUIRED_UNCHECKED;
        const optional =
          mode === FiscalIdMode.OPTIONAL_STRICT ||
          mode === FiscalIdMode.OPTIONAL_UNCHECKED;
        return {
          enabled: !!rule && (required || optional),
          required,
          sapCountry: rule?.sapCountry,
          sapType: rule?.sapFiscalIdRuleEntries?.[0]?.sapType,
        };
      })
    );
  }

  setFiscalId(value: string): Observable<unknown> {
    return this.getConfiguration().pipe(
      take(1),
      switchMap((configuration) => {
        if (!configuration.enabled || (!value && !configuration.required)) {
          return of(undefined);
        }
        if (!value || !configuration.sapCountry) {
          throw new Error('Fiscal ID and country are required.');
        }
        return combineLatest([
          this.userIdService.takeUserId(),
          this.activeCartFacade.takeActiveCartId(),
          this.activeCartFacade.takeActive(),
          this.baseSiteService.getActive(),
        ]).pipe(
          take(1),
          switchMap(([userId, cartId, cart, baseSiteId]) => {
            if (!userId || !cartId || !cart.code) {
              throw new Error('Checkout conditions not met');
            }
            if (
              cart.sapCustomerFiscalId?.sapFiscalIdEntries?.[0]?.sapValue ===
              value
            ) {
              return of(undefined);
            }
            const fiscalId: FiscalId = {
              sapCountry: configuration.sapCountry,
              sapFiscalIdEntries: [
                {
                  sapValue: value,
                  ...(configuration.sapType
                    ? { sapType: configuration.sapType }
                    : {}),
                },
              ],
            };
            const contextChanged$ = combineLatest([
              this.userIdService.getUserId(),
              this.activeCartFacade.getActiveCartId(),
              this.baseSiteService.getActive(),
            ]).pipe(
              filter(
                ([currentUser, currentCart, currentSite]) =>
                  currentUser !== userId ||
                  currentCart !== cartId ||
                  currentSite !== baseSiteId
              ),
              map(() => {
                throw new Error('Checkout context changed');
              })
            );
            return this.connector.setFiscalId(userId, cartId, fiscalId).pipe(
              switchMap(() => this.refreshCart(userId, cartId)),
              takeUntil(contextChanged$)
            );
          })
        );
      })
    );
  }

  protected refreshCart(userId: string, cartId: string): Observable<void> {
    return this.multiCartFacade.isStable(cartId).pipe(
      filter(Boolean),
      take(1),
      switchMap(
        () =>
          new Observable<void>((subscriber) => {
            // Subscribe before loading so synchronous state transitions are observed.
            const subscription = this.multiCartFacade
              .getCartEntity(cartId)
              .pipe(
                skipWhile((state) => !state.loading),
                filter((state) => !state.loading),
                take(1)
              )
              .subscribe({
                next: (state) => {
                  if (!state.value?.code) {
                    subscriber.error(
                      new Error('The cart is no longer available.')
                    );
                    return;
                  }
                  if (state.error) {
                    subscriber.error(new Error('Failed to refresh the cart.'));
                    return;
                  }
                  subscriber.next();
                  subscriber.complete();
                },
                error: (error) => subscriber.error(error),
              });
            this.multiCartFacade.loadCart({ userId, cartId });
            return subscription;
          })
      )
    );
  }
}
