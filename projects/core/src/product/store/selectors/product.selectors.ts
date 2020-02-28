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
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, LoaderState<Product>> => {
  return createSelector(getProductState, details =>
    scope
      ? StateEntityLoaderSelectors.entityStateSelector(details, code)[scope] ||
        initialLoaderState
      : StateEntityLoaderSelectors.entityStateSelector(details, code)
  );
};

export const getSelectedProductFactory = (
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, Product> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    productState => StateLoaderSelectors.loaderValueSelector(productState)
  );
};

export const getSelectedProductLoadingFactory = (
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    productState => StateLoaderSelectors.loaderLoadingSelector(productState)
  );
};

export const getSelectedProductSuccessFactory = (
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    productState => StateLoaderSelectors.loaderSuccessSelector(productState)
  );
};

export const getSelectedProductErrorFactory = (
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    productState => StateLoaderSelectors.loaderErrorSelector(productState)
  );
};

export const getAllProductCodes: MemoizedSelector<
  StateWithProduct,
  string[]
> = createSelector(getProductState, details => {
  return Object.keys(details.entities);
});
