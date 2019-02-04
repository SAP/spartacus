import * as fromActions from '../actions/index';
import { CardType } from '../../../occ';

import * as fromReducer from './card-types.reducer';

describe('Card Types Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as fromActions.CardTypesAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CARD_TYPES_SUCCESS action', () => {
    it('should populate the card types state entities', () => {
      const cardTypes: CardType[] = [
        {
          code: 'amex',
          name: 'American Express'
        },
        {
          code: 'maestro',
          name: 'Maestro'
        }
      ];

      const mockCardTypesList = {
        amex: cardTypes[0],
        maestro: cardTypes[1]
      };

      const { initialState } = fromReducer;
      const action = new fromActions.LoadCardTypesSuccess(cardTypes);
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockCardTypesList);
    });
  });

  describe('CHECKOUT_CLEAR_MISCS_DATA action', () => {
    it('should clear the mics data', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.CheckoutClearMiscsData();
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
