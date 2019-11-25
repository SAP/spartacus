import { Action } from '@ngrx/store';
import { loaderReducer } from '../loader/loader.reducer';
import { CounterState } from './counter-state';
import { CounterAction } from './counter.action';

export const initialCounterState: CounterState<any> = {
  counter: 0,
};

/**
 * Higher order reducer that adds generic counter
 */
export function counterReducer<T>(
  loadActionType: string,
  reducer?: (state: T, action: Action) => T
): (state: CounterState<T>, action: CounterAction) => CounterState<T> {
  return (
    state: CounterState<T> = initialCounterState,
    action: CounterAction
  ): CounterState<T> => {
    if (action.meta && action.meta.entityType === loadActionType) {
      const entity = action.meta.counter;

      if (entity) {
        return {
          ...state,
          ...loaderReducer(loadActionType, reducer),
          counter: state.counter ? state.counter + entity : entity,
        };
      } else {
        // reset state action
        return {
          ...initialCounterState,
          ...loaderReducer(loadActionType, reducer),
        };
      }
    }

    if (reducer) {
      const newValue = reducer(state.value, action);
      if (newValue !== state.value) {
        return { ...state, value: newValue };
      }
    }
    return state;
  };
}
