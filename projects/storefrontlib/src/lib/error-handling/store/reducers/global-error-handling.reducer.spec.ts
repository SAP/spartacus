import * as fromActions from '../actions';
import * as fromReducer from './global-error-handling.reducer';

describe(`GlobalError reducer`, () => {
  describe(`undefined action`, () => {
    it(`should return the initial state`, () => {
      const { initalState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initalState);
    });
  });

  describe(`GLOBAL_ERROR_ACTION action`, () => {
    it(`should store the error`, () => {
      const error = `an error`;
      const { initalState } = fromReducer;
      const action = new fromActions.GlobalErrorHandlingAction(error);
      const state = fromReducer.reducer(initalState, action);
      expect(state.global).toEqual(error);
    });
  });
});
