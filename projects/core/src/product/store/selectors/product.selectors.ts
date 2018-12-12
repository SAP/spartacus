import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ProductEntity, ProductsState, StateWithProduct } from '../product-state';
import { getProductsState } from './feature.selector';
import { Product } from '../../../occ-models/occ.models';

export const getProductState: MemoizedSelector<any, any> = createSelector(
  getProductsState,
  (state: ProductsState) => state.details
);

export const getSelectedProductsFactory = (
  codes
): MemoizedSelector<StateWithProduct, any[]> => {
  return createSelector(
    getProductState,
    details => {
      return codes
        .map(code =>
          details.entities[code] ? details.entities[code].value : undefined
        )
        .filter(product => product !== undefined);
    }
  );
};

export const getSelectedProductStateFactory = (
  code
): MemoizedSelector<StateWithProduct, ProductEntity> => {
  return createSelector(
    getProductState,
    details => {
      return details.entities[code] ? details.entities[code] : false;
    }
  );
};

export const getSelectedProductFactory = (code): MemoizedSelector<StateWithProduct, Product> => {
  return createSelector(
    getSelectedProductStateFactory(code),
    productState => {
      return productState ? productState.value : undefined;
    }
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
