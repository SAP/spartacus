import { Product, ProductSearchPage, StateUtils } from '@spartacus/core';

export const BUNDLE_FEATURE = 'bundle';
export const BUNDLE_DATA = '[Bundle] Bundle Data';

export interface StateWithBundle {
  [BUNDLE_FEATURE]: BundlesState;
}

export interface AvailableEntriesEntities {
  [cartId: string]: {
    [sectionId: number]: {
      cartId: string;
      userId: string;
      entryGroupNumber: number;
    } & ProductSearchPage;
  };
}

export type SelectedProductsState = {
  [cartId: string]: {
    [bundleId: number]: {
      [sectionId: number]: Product[];
    };
  };
};

export interface BundlesState {
  availableEntries: StateUtils.LoaderState<AvailableEntriesState>;
  selectedProducts: StateUtils.LoaderState<SelectedProductsState>;
}

export interface AvailableEntriesState {
  availableEntriesEntities: AvailableEntriesEntities;
}
