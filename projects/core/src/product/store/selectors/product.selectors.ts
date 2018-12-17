import { createSelector, MemoizedSelector } from '@ngrx/store';

import { EntityLoaderState } from 'projects/core/src/state';

import { ProductsState, StateWithProduct } from '../product-state';
import { Product } from '../../../occ/occ-models/occ.models';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderErrorSelector,
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector
} from '../../../state/utils/loader/loader.selectors';

import { getProductsState } from './feature.selector';

export const getProductState: MemoizedSelector<
  StateWithProduct,
  EntityLoaderState<Product>
> = createSelector(
  getProductsState,
  (state: ProductsState) => state.details
);

export const getSelectedProductsFactory = (
  codes: string[]
): MemoizedSelector<StateWithProduct, Product[]> => {
  return createSelector(
    getProductState,
    (details: EntityLoaderState<Product>) => {
      return codes
        .map(code =>
          details.entities[code] ? details.entities[code].value : undefined
        )
        .filter(product => product !== undefined);
    }
  );
};

export const getSelectedProductStateFactory = (
  code: string
): MemoizedSelector<StateWithProduct, LoaderState<Product>> => {
  return createSelector(
    getProductState,
    details => entityStateSelector(details, code)
  );
};

export const getSelectedProductFactory = (
  code: string
): MemoizedSelector<StateWithProduct, Product> => {
  return createSelector(
    getSelectedProductStateFactory(code),
    productState => loaderValueSelector(productState)
  );
};

export const getSelectedProductLoadingFactory = (
  code: string
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code),
    productState => loaderLoadingSelector(productState)
  );
};

export const getSelectedProductSuccessFactory = (
  code: string
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code),
    productState => loaderSuccessSelector(productState)
  );
};

export const getSelectedProductErrorFactory = (
  code: string
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code),
    productState => loaderErrorSelector(productState)
  );
};

export const getAllProductCodes: MemoizedSelector<
  StateWithProduct,
  string[]
> = createSelector(
  getProductState,
  details => {
    return Object.keys(details.entities);
  }
);
