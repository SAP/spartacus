import { AnonymousConsentsActions } from '../actions/index';
import * as fromReducer from './anonymous-consents-update.reducer';

describe('anonymous-consents-update reducer', () => {
  describe('undefined state', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated;
      const result = fromReducer.reducer(undefined, action);
      expect(result).toEqual(initialState);
    });
  });

  it('should change the updated slice of the state', () => {
    const action = new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(
      true
    );
    const result = fromReducer.reducer(undefined, action);
    expect(result).toEqual(true);
  });
});
