import { MemoizedSelector } from '@ngrx/store';
import { StateWithUser } from '../user-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';
export declare const getInterestsState: MemoizedSelector<StateWithUser, LoaderState<ProductInterestSearchResult>>;
export declare const getInterests: MemoizedSelector<StateWithUser, ProductInterestSearchResult>;
export declare const getInterestsLoading: MemoizedSelector<StateWithUser, boolean>;
