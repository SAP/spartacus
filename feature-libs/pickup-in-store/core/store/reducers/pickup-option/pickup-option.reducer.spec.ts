import { PickupOptionActions } from '../../actions';
import { PickupOptionState } from '../../pickup-option-state';
import { getPickupReducers } from './index';
import { pageContextReducer } from './page-context.reducer';
import { initialState, pickupOptionReducer } from './pickup-option.reducer';
describe('pickup-option', () => {
  it('should add a pickup option', () => {
    expect(initialState).toEqual({});

    const action = PickupOptionActions.SetPickupOption({
      payload: {
        entryNumber: 0,
        pickupOption: 'pickup',
      },
    });
    const newState = pickupOptionReducer(initialState, action);
    const expected: PickupOptionState['pickupOption'] = {
      0: 'pickup',
    };
    expect(newState).toEqual(expected);
  });

  it('getReducer return reducer with all reducers', () => {
    const reducer = getPickupReducers();
    expect(reducer).toEqual({
      pickupOption: pickupOptionReducer,
      pageContext: pageContextReducer,
    });
  });
});
