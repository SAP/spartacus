import { MemoizedSelector } from '@ngrx/store';
import { StateWithStoreFinder, ViewAllStoresState } from '../store-finder-state';
import { StateUtils } from '@spartacus/core';
export declare const getViewAllStoresState: MemoizedSelector<StateWithStoreFinder, StateUtils.LoaderState<ViewAllStoresState>>;
export declare const getViewAllStoresEntities: MemoizedSelector<StateWithStoreFinder, ViewAllStoresState>;
export declare const getViewAllStoresLoading: MemoizedSelector<StateWithStoreFinder, boolean>;
