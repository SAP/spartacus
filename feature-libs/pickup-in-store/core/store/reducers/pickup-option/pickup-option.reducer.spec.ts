import { PickupOptionActions } from '../../actions';
import {
  EntryPickupOption,
  PickupOptionState,
} from '../../pickup-option-state';
import { getPickupReducers } from './index';
import { pageContextReducer } from './page-context.reducer';
import { initialState, pickupOptionReducer } from './pickup-option.reducer';
describe('pickup-option', () => {
  it('should add a pickup option', () => {
    expect(initialState).toEqual([]);

    const action = PickupOptionActions.SetPickupOption({
      payload: {
        entryNumber: 0,
        pickupOption: 'pickup',
      },
    });
    const newState = pickupOptionReducer(initialState, action);
    const expected: PickupOptionState['pickupOption'] = [
      { entryNumber: 0, pickupOption: 'pickup' },
    ];
    expect(newState).toEqual(expected);
  });

  it('getReducer return reducer with all reducers', () => {
    const reducer = getPickupReducers();
    expect(reducer).toEqual({
      pickupOption: pickupOptionReducer,
      pageContext: pageContextReducer,
    });
  });

  it('should modify the pickup option for a item present in the state', () => {
    const action = PickupOptionActions.SetPickupOption({
      payload: {
        entryNumber: 0,
        pickupOption: 'pickup',
      },
    });
    const mockState: EntryPickupOption[] = [
      {
        entryNumber: 0,
        pickupOption: 'delivery',
      },
    ];
    const expected: EntryPickupOption[] = [
      {
        entryNumber: 0,
        pickupOption: 'pickup',
      },
    ];
    const received = pickupOptionReducer(mockState, action);
    expect(received).toEqual(expected);
  });

  it('should remove the pickup option for a item present in the state', () => {
    const action = PickupOptionActions.RemovePickupOption({
      payload: {
        entryNumber: 1,
      },
    });
    const mockState: EntryPickupOption[] = [
      {
        entryNumber: 0,
        pickupOption: 'delivery',
      },
      {
        entryNumber: 1,
        pickupOption: 'pickup',
      },
      {
        entryNumber: 2,
        pickupOption: 'delivery',
      },
    ];

    const expected: EntryPickupOption[] = [
      {
        entryNumber: 0,
        pickupOption: 'delivery',
      },
      {
        entryNumber: 1,
        pickupOption: 'delivery',
      },
    ];
    const received = pickupOptionReducer(mockState, action);
    expect(received).toEqual(expected);
  });

  it('should remove all pickup options', () => {
    const action = PickupOptionActions.RemoveAllPickupOptions();
    const mockState: EntryPickupOption[] = [
      {
        entryNumber: 0,
        pickupOption: 'delivery',
      },
    ];
    const expected: EntryPickupOption[] = [];
    const received = pickupOptionReducer(mockState, action);
    expect(received).toEqual(expected);
  });
});
