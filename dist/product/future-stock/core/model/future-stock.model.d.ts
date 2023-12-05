import { FutureStock } from '@spartacus/core';
export interface ProductFutureStock {
    futureStocks: FutureStock[];
    productCode: string;
}
export interface ProductFutureStockList {
    productFutureStocks: FutureStock[];
}
