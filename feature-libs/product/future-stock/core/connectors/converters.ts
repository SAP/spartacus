import { InjectionToken } from "@angular/core";
import { Converter } from "@spartacus/core";
import { ProductFutureStock } from "../model/future-stock.model";

export const FUTURE_STOCK_NORMALIZER = new InjectionToken<Converter<any, ProductFutureStock>>(
  'FutureStockNormalizer'
);
