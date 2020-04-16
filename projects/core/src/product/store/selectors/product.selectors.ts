import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';
import {
  initialLoaderState,
  StateEntityLoaderSelectors,
  StateLoaderSelectors,
} from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { ProductsState, StateWithProduct } from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductState: MemoizedSelector<
  StateWithProduct,
  EntityLoaderState<Product>
> = createSelector(getProductsState, (state: ProductsState) => state.details);

export const getSelectedProductStateFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, LoaderState<Product>> => {
  return createSelector(
    getProductState,
    (details) =>
      StateEntityLoaderSelectors.entityStateSelector(details, code)[scope] ||
      initialLoaderState
  );
};

export const getSelectedProductFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, Product> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateLoaderSelectors.loaderValueSelector(productState)
  );
};

export const getSelectedProductLoadingFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateLoaderSelectors.loaderLoadingSelector(productState)
  );
};

export const getSelectedProductSuccessFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateLoaderSelectors.loaderSuccessSelector(productState)
  );
};

export const getSelectedProductErrorFactory = (
  code: string,
  scope = ''
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateLoaderSelectors.loaderErrorSelector(productState)
  );
};

export const getAllProductCodes: MemoizedSelector<
  StateWithProduct,
  string[]
> = createSelector(getProductState, (details) => {
  return Object.keys(details.entities);
});
