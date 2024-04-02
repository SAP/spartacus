/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import {
  B2BPaymentTypeEnum,
  CheckoutPaymentTypeFacade,
  CheckoutPaymentTypeSetEvent,
  CheckoutPaymentTypesQueryReloadEvent,
  CheckoutPaymentTypesQueryResetEvent,
} from '@spartacus/checkout/b2b/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  HttpErrorModel,
  OCC_USER_ID_ANONYMOUS,
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { Observable, combineLatest, of, throwError } from 'rxjs';
import { concatMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutPaymentTypeConnector } from '../connectors/checkout-payment-type/checkout-payment-type.connector';

@Injectable()
export class CheckoutPaymentTypeService implements CheckoutPaymentTypeFacade {
  protected getCheckoutPaymentTypesQueryReloadEvents(): QueryNotifier[] {
    return [CheckoutPaymentTypesQueryReloadEvent];
  }
  protected getCheckoutPaymentTypesQueryResetEvents(): QueryNotifier[] {
    return [CheckoutPaymentTypesQueryResetEvent];
  }

  protected paymentTypesQuery: Query<PaymentType[]> = this.queryService.create(
    () => this.paymentTypeConnector.getPaymentTypes(),
    {
      reloadOn: this.getCheckoutPaymentTypesQueryReloadEvents(),
      resetOn: this.getCheckoutPaymentTypesQueryResetEvents(),
    }
  );

  protected setPaymentTypeCommand: Command<
    { paymentTypeCode: string; purchaseOrderNumber?: string },
    unknown
  > = this.commandService.create<{
    paymentTypeCode: string;
    purchaseOrderNumber?: string;
  }>(
    ({ paymentTypeCode, purchaseOrderNumber }) =>
      this.checkoutPreconditions().pipe(
        switchMap(([userId, cartId]) =>
          this.paymentTypeConnector
            .setPaymentType(
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
    protected paymentTypeConnector: CheckoutPaymentTypeConnector,
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
    return this.paymentTypesQuery.getState();
  }

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.getPaymentTypesState().pipe(
      concatMap((state) =>
        (state?.error as HttpErrorModel)
          ? throwError(state.error as HttpErrorModel)
          : of(state)
      ),
      map((state) => state.data ?? [])
    );
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
    return this.checkoutQueryFacade
      .getCheckoutDetailsState()
      .pipe(map((state) => ({ ...state, data: state.data?.paymentType })));
  }

  isAccountPayment(): Observable<boolean> {
    return this.getSelectedPaymentTypeState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data?.code === B2BPaymentTypeEnum.ACCOUNT_PAYMENT)
    );
  }

  getPurchaseOrderNumberState(): Observable<QueryState<string | undefined>> {
    return this.checkoutQueryFacade
      .getCheckoutDetailsState()
      .pipe(
        map((state) => ({ ...state, data: state.data?.purchaseOrderNumber }))
      );
  }
}
