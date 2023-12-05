import { PointOfServiceStock, Stock } from '@spartacus/core';
export declare function isInStock(stockInfo: Stock | undefined): boolean;
export declare function storeHasStock({ stockInfo }: PointOfServiceStock): boolean;
