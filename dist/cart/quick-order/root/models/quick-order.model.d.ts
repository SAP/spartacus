import { OrderEntry } from '@spartacus/cart/base/root';
import { HttpErrorModel } from '@spartacus/core';
export type QuickOrderAddEntryEvent = {
    productCode: string;
    entry?: OrderEntry;
    quantityAdded?: number;
    quantity: number;
    error?: HttpErrorModel;
};
