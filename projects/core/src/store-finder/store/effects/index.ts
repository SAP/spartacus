import { FindStoresEffect } from './find-stores.effect';
import { ViewAllStoresEffect } from './view-all-stores.effect';

export const storeFinderEffects: any[] = [
  FindStoresEffect,
  ViewAllStoresEffect
];

export * from './find-stores.effect';
export * from './view-all-stores.effect';
