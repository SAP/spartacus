import { createAction } from '@ngrx/store';

export const HIDE_OUT_OF_STOCK_OPTIONS = '[Stock] Hide Out Of Stock';

export const HideOutOfStockOptionsAction = createAction(
  HIDE_OUT_OF_STOCK_OPTIONS
);
