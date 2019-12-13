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
  OrderReturnRequestService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class OrderCancelOrReturnService {
  private _cancelOrReturnRequestInputs: CancelOrReturnRequestEntryInput[] = [];
  private lang = 'en';
  private keepRequestInputs = false;

  get isCancelling$(): Observable<boolean> {
    return this.userOrderService.getCancelOrderLoading();
  }

  get isCancelSuccess$(): Observable<boolean> {
    return this.userOrderService.getCancelOrderSuccess();
  }

  get isReturning$(): Observable<boolean> {
    return this.returnRequestService.getReturnRequestLoading();
  }

  get isReturnSuccess$(): Observable<boolean> {
    return this.returnRequestService.getReturnRequestSuccess();
  }

  constructor(
    protected languageService: LanguageService,
    protected routing: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected userOrderService: UserOrderService,
    protected returnRequestService: OrderReturnRequestService
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

  backToOrder(orderCode: string): void {
    this.routing.go({
      cxRoute: 'orderDetails',
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

  cancelSuccess(orderCode: string): void {
    this.clearCancelOrReturnRequestInputs();
    this.userOrderService.resetCancelOrderProcessState();
    this.globalMessageService.add(
      {
        key: 'orderDetails.cancellationAndReturn.cancelSuccess',
        params: { orderCode },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routing.go({
      cxRoute: 'orders',
    });
  }

  returnOrder(orderCode: string): void {
    this.returnRequestService.createOrderReturnRequest({
      orderCode,
      returnRequestEntryInputs: this.cancelOrReturnRequestInputs,
    });
  }

  returnSuccess(): void {
    this.clearCancelOrReturnRequestInputs();

    let rma: string;
    this.returnRequestService
      .getOrderReturnRequest()
      .pipe(take(1))
      .subscribe(returnRequest => (rma = returnRequest.rma));

    this.globalMessageService.add(
      {
        key: 'orderDetails.cancellationAndReturn.returnSuccess',
        params: { rma },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routing.go({
      cxRoute: 'returnRequestDetails',
      params: { rma },
    });
  }

  clearReturnRequest(): void {
    this.returnRequestService.clearOrderReturnRequestDetail();
  }
}
