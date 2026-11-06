import { AnonymousConsentsActions } from '../actions/index';
import * as fromReducer from './anonymous-consents-banner.reducer';

describe('anonymous-consents-banner reducer', () => {
  describe('undefined state', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action =
        {} as AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed;
      const result = fromReducer.reducer(undefined, action);
      expect(result).toEqual(initialState);
    });
  });

  it('should change the banner dismissed slice of the state', () => {
    const action =
      new AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed(
        true
      );
    const result = fromReducer.reducer(undefined, action);
    expect(result).toEqual(true);
  });
});
