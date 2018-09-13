import * as fromActions from '../actions';

export interface GlobalErrorState {
  global: any;
}

export const initalState: GlobalErrorState = {
  global: {}
};

export function reducer(
  state = initalState,
  action: fromActions.GlobalErrorHandlingAction
): GlobalErrorState {
  switch (action.type) {
    case fromActions.GLOBAL_ERROR_HANDLING_ACTION: {
      console.error(
        `Caught an error in the 'global-error.reducer.ts'`,
        action.error
      );
      return {
        ...state,
        global: action.error
      };
    }
  }

  return state;
}

export const getGlobalError = (state: GlobalErrorState) => state.global;
