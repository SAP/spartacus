import { MemoizedSelector } from '@ngrx/store';
import { FindStoresState, StateWithStoreFinder } from '../store-finder-state';
import { StateUtils } from '@spartacus/core';
export declare const getFindStoresState: MemoizedSelector<StateWithStoreFinder, StateUtils.LoaderState<FindStoresState>>;
export declare const getFindStoresEntities: MemoizedSelector<StateWithStoreFinder, FindStoresState>;
export declare const getStoresLoading: MemoizedSelector<StateWithStoreFinder, boolean>;
export declare const getStoresSuccess: MemoizedSelector<StateWithStoreFinder, boolean>;
