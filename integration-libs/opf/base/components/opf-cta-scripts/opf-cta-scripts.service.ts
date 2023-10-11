import { Injectable, inject } from '@angular/core';
import {
  CmsService,
  GlobalMessageService,
  GlobalMessageType,
  QueryState,
} from '@spartacus/core';
import { Order, OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
import { Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import {
  ActiveConfiguration,
  CmsPageLocation,
  CtaScriptsLocation,
  CtaScriptsRequest,
  OpfPaymentFacade,
} from '@spartacus/opf/base/root';

@Injectable({
  providedIn: 'root',
})
export class OpfCtaScriptsService {
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected orderDetailsService = inject(OrderFacade);
  protected orderHistoryService = inject(OrderHistoryFacade);
  protected globalMessageService = inject(GlobalMessageService);
  protected cmsService = inject(CmsService);

  getCtaScripts() {
    let _paymentAccountIds: number[];
    let _scriptLocation: CtaScriptsLocation;
    return this.getPaymentAccountIds().pipe(
      switchMap((paymentAccountIds) => {
        console.log('paymentAccountIds', paymentAccountIds);
        _paymentAccountIds = paymentAccountIds;
        return this.getScriptLocation();
      }),
      switchMap((scriptsLocation) => {
        _scriptLocation = scriptsLocation;
        return this.getOrderDetails(scriptsLocation);
      }),
      switchMap((order) => {
        console.log('flo order', order);
        const ctaScripts: CtaScriptsRequest = {
          orderId: order?.code,
          ctaProductItems: this.getProductItems(order),
          paymentAccountIds: _paymentAccountIds,
          scriptLocations: [_scriptLocation],
        };

        return this.opfPaymentFacade.ctaScripts(ctaScripts);
      })
    );
  }

  protected getScriptLocation(): Observable<CtaScriptsLocation> {
    return this.cmsService.getCurrentPage().pipe(
      take(1),
      switchMap((page) => {
        switch (page.pageId) {
          case CmsPageLocation.ORDER_PAGE:
            return of(CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE);
          case CmsPageLocation.ORDER_CONFIRMATION_PAGE:
            return of(CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE);
          default:
            return throwError({ error: 'Page not valid' });
        }
      })
    );
  }

  protected getOrderDetails(scriptsLocation: CtaScriptsLocation) {
    const order$ =
      scriptsLocation == CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
        ? this.orderDetailsService.getOrderDetails()
        : this.orderHistoryService.getOrderDetails();
    return order$.pipe(
      filter((order) => !!order?.entries),
      switchMap((order) => {
        if (!order) {
          return throwError({ error: 'Order obj not found' });
        }
        if (!order?.entries) {
          return throwError({ error: 'Order entries not found' });
        }
        return of(order);
      })
    );
  }

  protected getPaymentAccountIds() {
    return this.opfPaymentFacade.getActiveConfigurationsState().pipe(
      tap((state: QueryState<ActiveConfiguration[] | undefined>) => {
        console.log('onTap');
        if (state.error) {
          this.displayError('loadActiveConfigurations');
        } else if (!state.loading && !Boolean(state.data?.length)) {
          this.displayError('noActiveConfigurations');
        }
      }),
      filter(
        (state) => !state.loading && !state.error && Boolean(state.data?.length)
      ),
      map((state) => state.data?.map((val) => val.id) as number[])
    );
  }

  protected getProductItems(
    order: Order
  ): { productId: string; quantity: number }[] | [] {
    return !!order.entries
      ? order.entries
          ?.filter((item) => {
            return !!item?.product?.code && !!item?.quantity;
          })
          .map((item) => {
            return {
              productId: item.product?.code as string,
              quantity: item.quantity as number,
            };
          })
      : [];
  }

  protected displayError(errorKey: string): void {
    this.globalMessageService.add(
      { key: `opf.checkout.errors.${errorKey}` },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}
