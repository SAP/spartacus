import { AddCartEntryCollector, RemoveCartEntryCollector } from './cart/index';
import { UpdateCartEntryCollector } from './cart/update-cart-entry.collector';
import {
  CategoryPageViewCollector,
  PageViewCollector,
  ProductPageViewCollector,
  SearchPageViewCollector,
} from './page-view';

export * from './cart/index';
export * from './page-view/index';

export const collectors = [
  PageViewCollector,
  ProductPageViewCollector,
  SearchPageViewCollector,
  CategoryPageViewCollector,

  AddCartEntryCollector,
  RemoveCartEntryCollector,
  UpdateCartEntryCollector,
];
