import { createReducer, on } from '@ngrx/store';
import { PickupOptionActions } from '../../actions';
import { PickupOptionState } from '../../pickup-option-state';

export const initialState: PickupOptionState['pageContext'] = '';
export const pageContextReducer = createReducer(
  initialState,
  on(
    PickupOptionActions.SetPageContext,
    (_state: PickupOptionState['pageContext'], { payload }) =>
      payload.pageContext
  )
);
