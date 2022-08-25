import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  PickupOptionState,
  StateWithPickupOption,
} from '../pickup-option-state';
import { getPickupOptionState } from './feature.selectors';

export const getPageContext = (): MemoizedSelector<
  StateWithPickupOption,
  string
> =>
  createSelector(
    getPickupOptionState,
    (state: PickupOptionState) => state.pageContext
  );

export const getPickupOption = (
  entryNumber: number
): MemoizedSelector<StateWithPickupOption, string> =>
  createSelector(
    getPickupOptionState,
    (state: PickupOptionState) => state.pickupOption[entryNumber]
  );
