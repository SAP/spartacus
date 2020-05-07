import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '../../../state/utils/index';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getCustomerSearchResultsLoaderState: MemoizedSelector<
  StateWithAsm,
  StateUtils.LoaderState<CustomerSearchPage>
> = createSelector(
  getAsmState,
  (state: AsmState) => state.customerSearchResult
);

export const getCustomerSearchResults: MemoizedSelector<
  StateWithAsm,
  CustomerSearchPage
> = createSelector(getCustomerSearchResultsLoaderState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getCustomerSearchResultsLoading: MemoizedSelector<
  StateWithAsm,
  boolean
> = createSelector(getCustomerSearchResultsLoaderState, (state) =>
  StateUtils.loaderLoadingSelector(state)
);
