// import { BundleActions } from '../actions/index';
// import * as fromReducers from './available-entries.reducer';
// import { SearchConfig } from '@spartacus/core';

// const cartId = 'test-cart';
// const sectionId = 'test-user';
// const entryGroupNumber = 1;

// describe('Available Entries Reducer', () => {
//   describe('Undefined action', () => {
//     it('should return the default state', () => {
//       const { initialState } = fromReducers;
//       const action = {} as any;
//       const state = fromReducers.availableEntriesReducer(undefined, action);

//       expect(state).toBe(initialState);
//     });
//   });

//   describe('GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS action', () => {
//     it('should populate results after loading', () => {
//       const searchConfig: SearchConfig = { pageSize: 10 };
//       const results = { cartId, entryGroupNumber, name: 'test' };
//       const { initialState } = fromReducers;
//       const loadAction = new BundleActions.GetBundleAllowedProducts({
//         cartId,
//         userId: sectionId,
//         entryGroupNumber,
//         searchConfig,
//       });

//       const loadingState = fromReducers.availableEntriesReducer(
//         initialState,
//         loadAction
//       );
//       const resultAction = new BundleActions.GetBundleAllowedProductsSuccess(
//         results
//       );
//       const state = fromReducers.availableEntriesReducer(
//         loadingState,
//         resultAction
//       );

//       expect(state.availableEntriesEntities).toEqual({
//         [cartId]: { [sectionId]: results },
//       });
//     });
//   });
// });
