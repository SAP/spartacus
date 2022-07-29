import { AddBrowserLocation } from '../../actions/browser-location.action';
import * as fromReducer from './browser-location.reducer';

describe('browserLocationReducer', () => {
  it('should set longitude and latitude', () => {
    const { initialState } = fromReducer;
    const action = AddBrowserLocation({
      payload: { latitude: 0, longitude: 0 },
    });
    const result = fromReducer.browserLocationReducer(initialState, action);
    expect(result).toEqual({ ...initialState, latitude: 0, longitude: 0 });
  });
});
