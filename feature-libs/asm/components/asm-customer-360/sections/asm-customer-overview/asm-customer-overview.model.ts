import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';

export interface AsmInterestProductEntry {
  products: Observable<Product | undefined>[];
}

export enum OverviewSection {
  ACTIVE_CART = 'ACTIVE_CART',
  SAVED_CART = 'SAVED_CART',
  INTERESTS = 'INTERESTS',
}
