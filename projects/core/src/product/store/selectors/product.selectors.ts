import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { StateUtils } from '../../../state/utils/index';
import { ProductsState, StateWithProduct } from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductState: MemoizedSelector<
  StateWithProduct,
  StateUtils.EntityLoaderState<Product>
> = createSelector(getProductsState, (state: ProductsState) => state.details);

export const getSelectedProductsFactory = (
  codes: string[]
): MemoizedSelector<StateWithProduct, Product[]> => {
  return createSelector(
    getProductState,
    (details: StateUtils.EntityLoaderState<Product>) => {
      return codes
        .map((code) =>
          details.entities[code] ? details.entities[code].value : undefined
        )
        .filter((product) => product !== undefined);
    }
  );
};

export const getSelectedProductStateFactory = (
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, StateUtils.LoaderState<Product>> => {
  return createSelector(getProductState, (details) =>
    scope
      ? StateUtils.entityStateSelector(details, code)[scope] ||
        StateUtils.initialLoaderState
      : StateUtils.entityStateSelector(details, code)
  );
};

export const getSelectedProductFactory = (
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, Product> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateUtils.loaderValueSelector(productState)
  );
};

export const getSelectedProductLoadingFactory = (
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateUtils.loaderLoadingSelector(productState)
  );
};

export const getSelectedProductSuccessFactory = (
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateUtils.loaderSuccessSelector(productState)
  );
};

export const getSelectedProductErrorFactory = (
  code: string,
  scope?: string
): MemoizedSelector<StateWithProduct, boolean> => {
  return createSelector(
    getSelectedProductStateFactory(code, scope),
    (productState) => StateUtils.loaderErrorSelector(productState)
  );
};

export const getAllProductCodes: MemoizedSelector<
  StateWithProduct,
  string[]
> = createSelector(getProductState, (details) => {
  return Object.keys(details.entities);
});
