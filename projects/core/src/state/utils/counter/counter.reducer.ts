import { Action } from '@ngrx/store';
import { initialLoaderState, loaderReducer } from '../loader/loader.reducer';
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
    state: CounterState<T> = {
      ...initialCounterState,
      ...initialLoaderState,
    },
    action: CounterAction
  ): CounterState<T> => {
    if (action.meta && action.meta.entityType === loadActionType) {
      const counter = action.meta.counter;
      if (counter) {
        return {
          ...state,
          ...loaderReducer(loadActionType, reducer)(state, action),
          counter: state.counter ? state.counter + counter : counter,
        };
      } else if (!action.meta.loader) {
        // reset state action
        return {
          ...initialCounterState,
          ...loaderReducer(loadActionType, reducer)(state, action),
        };
      } else {
        return {
          ...state,
          ...loaderReducer(loadActionType, reducer)(state, action),
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
