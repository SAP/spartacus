/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import {
  B2BPaymentTypeEnum,
  CheckoutPaymentTypeFacade,
  CheckoutPaymentTypeSetEvent,
} from '@spartacus/checkout/b2b/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';

@Injectable({
  providedIn: 'root',
})
export class OpfB2bCheckoutPaymentTypeService
  implements CheckoutPaymentTypeFacade
{
  protected opfPaymentFacade = inject(OpfPaymentFacade);

  protected setPaymentTypeCommand: Command<{
    paymentTypeCode: string;
    purchaseOrderNumber?: string;
  }> = this.commandService.create<{
    paymentTypeCode: string;
    purchaseOrderNumber?: string;
  }>(
    ({ paymentTypeCode, purchaseOrderNumber }) =>
      this.checkoutPreconditions().pipe(
        switchMap(([userId, cartId]) =>
          this.opfPaymentFacade
            .setCartPaymentOption(
              userId,
              cartId,
              paymentTypeCode,
              purchaseOrderNumber
            )
            .pipe(
              tap(() =>
                this.eventService.dispatch(
                  {
                    userId,
                    cartId,
                    paymentTypeCode,
                    purchaseOrderNumber,
                  },
                  CheckoutPaymentTypeSetEvent
                )
              )
            )
        )
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected eventService: EventService,
    protected checkoutQueryFacade: CheckoutQueryFacade
  ) {}

  protected checkoutPreconditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      take(1),
      map(([userId, cartId, isGuestCart]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  getPaymentTypesState(): Observable<QueryState<PaymentType[] | undefined>> {
    return of();
  }

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.getPaymentTypesState().pipe(map((state) => state.data ?? []));
  }

  setPaymentType(
    paymentTypeCode: B2BPaymentTypeEnum,
    purchaseOrderNumber?: string
  ): Observable<unknown> {
    return this.setPaymentTypeCommand.execute({
      paymentTypeCode,
      purchaseOrderNumber,
    });
  }

  getSelectedPaymentTypeState(): Observable<
    QueryState<PaymentType | undefined>
  > {
    return this.activeCartFacade.getActive().pipe(
      take(1),
      map((cart) => ({
        data: cart.paymentType,
        loading: false,
        error: false,
      }))
    );
  }

  isAccountPayment(): Observable<boolean> {
    return this.activeCartFacade.getActive().pipe(
      take(1),
      map(
        (cart) => cart.paymentType?.code === B2BPaymentTypeEnum.ACCOUNT_PAYMENT
      )
    );
  }

  getPurchaseOrderNumberState(): Observable<QueryState<string | undefined>> {
    return this.activeCartFacade.getActive().pipe(
      take(1),
      map((cart) => ({
        data: cart.purchaseOrderNumber,
        loading: false,
        error: false,
      }))
    );
  }
}
