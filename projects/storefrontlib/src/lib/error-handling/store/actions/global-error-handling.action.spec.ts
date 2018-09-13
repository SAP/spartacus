import * as fromActions from '.';

describe(`Global Error Handling Actions`, () => {
  describe(`GlobalErrorHandlingAction`, () => {
    it(`should create the action`, () => {
      const action = new fromActions.GlobalErrorHandlingAction(`an error`);
      expect({ ...action }).toEqual({
        type: fromActions.GLOBAL_ERROR_HANDLING_ACTION,
        error: `an error`
      });
    });
  });
});
