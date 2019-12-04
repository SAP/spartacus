import { Injectable } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import {
  CancelOrReturnRequestEntryInput,
  OrderEntry,
  LanguageService,
  Price,
  RoutingService,
  GlobalMessageService,
  GlobalMessageType,
  UserOrderService,
} from '@spartacus/core';
import { tap, map, share } from 'rxjs/operators';

@Injectable()
export class OrderCancelOrReturnService {
  private _cancelOrReturnRequestInputs: CancelOrReturnRequestEntryInput[] = [];
  private lang = 'en';
  private keepRequestInputs = false;

  isCancelling$ = this.userOrderService.getOrderDetailsState().pipe(
    tap(state => {
      if (state.success && !state.loading) {
        this.clearCancelOrReturnRequestInputs();
        this.globalMessageService.add(
          {
            key: 'orderDetails.cancellationAndReturn.cancelSuccess',
            params: { orderCode: state.value.code },
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        this.routing.go({
          cxRoute: 'orders',
        });
      }
    }),
    map(state => state.loading),
    share()
  );

  constructor(
    protected languageService: LanguageService,
    protected routing: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected userOrderService: UserOrderService
  ) {
    this.languageService.getActive().subscribe(value => (this.lang = value));
  }

  get cancelOrReturnRequestInputs(): CancelOrReturnRequestEntryInput[] {
    return this._cancelOrReturnRequestInputs;
  }

  set cancelOrReturnRequestInputs(values: CancelOrReturnRequestEntryInput[]) {
    this._cancelOrReturnRequestInputs = values;
  }

  clearCancelOrReturnRequestInputs() {
    if (!this.keepRequestInputs) {
      this._cancelOrReturnRequestInputs = [];
    } else {
      this.keepRequestInputs = false;
    }
  }

  /**
   * As discussed, this calculation is moved to SPA side.
   * The calculation and validation should be in backend facade layer.
   */
  getCancelledOrReturnedPrice(entry: OrderEntry): Price {
    const qty = this.getEntryCancelledOrReturnedQty(entry);

    const returnedItemsPriceData = Object.assign({}, entry.basePrice);

    returnedItemsPriceData.value =
      Math.round(entry.basePrice.value * qty * 100) / 100;

    returnedItemsPriceData.formattedValue = formatCurrency(
      returnedItemsPriceData.value,
      this.lang,
      getCurrencySymbol(returnedItemsPriceData.currencyIso, 'narrow'),
      returnedItemsPriceData.currencyIso
    );

    return returnedItemsPriceData;
  }

  goToOrderCancelOrReturn(
    cxRoute: string,
    orderCode: string,
    isBack?: boolean
  ): void {
    // When back from confirmation page to order return/cancel page,
    // we want to keep the request inputs
    this.keepRequestInputs = isBack;

    this.routing.go({
      cxRoute: cxRoute,
      params: { code: orderCode },
    });
  }

  isEntryCancelledOrReturned(entry: OrderEntry): boolean {
    for (const input of this._cancelOrReturnRequestInputs) {
      if (input.orderEntryNumber === entry.entryNumber) {
        return true;
      }
    }
    return false;
  }

  getEntryCancelledOrReturnedQty(entry: OrderEntry): number {
    for (const input of this._cancelOrReturnRequestInputs) {
      if (input.orderEntryNumber === entry.entryNumber) {
        return input.quantity;
      }
    }
    return 0;
  }

  cancelOrder(orderCode: string): void {
    this.userOrderService.cancelOrder(orderCode, {
      cancellationRequestEntryInputs: this.cancelOrReturnRequestInputs,
    });
  }
}
