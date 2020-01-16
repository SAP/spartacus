import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateLoaderSelectors } from '../../../state/utils/loader/loader-group.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getCustomerSearchResultsLoaderState: MemoizedSelector<
  StateWithAsm,
  LoaderState<CustomerSearchPage>
> = createSelector(
  getAsmState,
  (state: AsmState) => state.customerSearchResult
);

export const getCustomerSearchResults: MemoizedSelector<
  StateWithAsm,
  CustomerSearchPage
> = createSelector(
  getCustomerSearchResultsLoaderState,
  state => StateLoaderSelectors.loaderValueSelector(state)
);

export const getCustomerSearchResultsLoading: MemoizedSelector<
  StateWithAsm,
  boolean
> = createSelector(
  getCustomerSearchResultsLoaderState,
  state => StateLoaderSelectors.loaderLoadingSelector(state)
);
