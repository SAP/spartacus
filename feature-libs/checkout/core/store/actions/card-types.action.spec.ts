import { CardType } from '@spartacus/core';
import { CheckoutActions } from '../actions/index';

describe('Card Types Actions', () => {
  describe('LoadCardTypes', () => {
    it('should create the action', () => {
      const action = new CheckoutActions.LoadCardTypes();
      expect({ ...action }).toEqual({
        type: CheckoutActions.LOAD_CARD_TYPES,
      });
    });
  });

  describe('LoadCardTypesFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new CheckoutActions.LoadCardTypesFail(error);

      expect({ ...action }).toEqual({
        type: CheckoutActions.LOAD_CARD_TYPES_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadCardTypesSuccess', () => {
    it('should create the action', () => {
      const cardTypes: CardType[] = [
        {
          code: 'amex',
          name: 'American Express',
        },
        {
          code: 'maestro',
          name: 'Maestro',
        },
      ];
      const action = new CheckoutActions.LoadCardTypesSuccess(cardTypes);
      expect({ ...action }).toEqual({
        type: CheckoutActions.LOAD_CARD_TYPES_SUCCESS,
        payload: cardTypes,
      });
    });
  });
});
