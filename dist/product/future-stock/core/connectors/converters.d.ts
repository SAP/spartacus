import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ProductFutureStock, ProductFutureStockList } from '../model/future-stock.model';
export declare const FUTURE_STOCK_NORMALIZER: InjectionToken<Converter<any, ProductFutureStock>>;
export declare const FUTURE_STOCK_LIST_NORMALIZER: InjectionToken<Converter<any, ProductFutureStockList>>;
