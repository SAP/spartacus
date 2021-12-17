import { HttpErrorModel, OrderEntry } from '@spartacus/core';

export type QuickOrderAddEntryEvent = {
  productCode: string;
  entry?: OrderEntry;
  quantityAdded?: number;
  quantity: number;
  error?: HttpErrorModel;
};
