import { PickupOptionActions } from '../../actions';
import { PickupOptionState } from '../../pickup-option-state';
import { initialState, pageContextReducer } from './page-context.reducer';

describe('page context', () => {
  it('should add a page context', () => {
    expect(initialState).toBe('');

    const action = PickupOptionActions.SetPageContext({
      payload: {
        pageContext: 'CART',
      },
    });
    const newState = pageContextReducer(initialState, action);
    const expected: PickupOptionState['pageContext'] = 'CART';

    expect(newState).toEqual(expected);
  });
});
