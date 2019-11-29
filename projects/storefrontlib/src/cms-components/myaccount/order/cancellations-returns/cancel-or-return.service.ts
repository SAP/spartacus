import { Injectable } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import {
  CancelOrReturnRequestEntryInput,
  OrderEntry,
  LanguageService,
  Price,
  RoutingService,
} from '@spartacus/core';

@Injectable()
export class OrderCancelOrReturnService {
  private _cancelOrReturnRequestInputs: CancelOrReturnRequestEntryInput[] = [];

  constructor(
    protected languageService: LanguageService,
    protected routing: RoutingService
  ) {}

  private lang = 'en';

  get cancelOrReturnRequestInputs(): CancelOrReturnRequestEntryInput[] {
    return this._cancelOrReturnRequestInputs;
  }

  set cancelOrReturnRequestInputs(values: CancelOrReturnRequestEntryInput[]) {
    this._cancelOrReturnRequestInputs = values;
  }

  clearCancelOrReturnRequestInputs() {
    this._cancelOrReturnRequestInputs = [];
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

  goToOrderCancelOrReturn(cxRoute: string, orderCode: string): void {
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
}
