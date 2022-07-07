import { getReducers } from './index';

describe('getReducer', () => {
  it('should call getReducer', () => {
    expect(getReducers()).toBeDefined();
  });
});
