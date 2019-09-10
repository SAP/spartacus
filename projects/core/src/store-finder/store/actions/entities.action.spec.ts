import { StoreFinderActions } from './index';

describe('Entities Actions', () => {
  describe('StoreEntities', () => {
    it('should create StoreEntities action', () => {
      const payload = {
        entities: [
          {
            count: 1,
            isoCode: 'DE',
            name: 'Germany',
            type: 'COUNTRY',
          },
          {
            count: 1,
            isoCode: 'PL',
            name: 'Poland',
            type: 'COUNTRY',
          },
          {
            count: 49,
            isoCode: 'JP',
            name: 'Japan',
            type: 'COUNTRY',
          },
        ],
      };

      const action = new StoreFinderActions.StoreEntities(payload);

      expect({ ...action }).toEqual({
        type: StoreFinderActions.STORE_ENTITIES,
        payload,
      });
    });
  });
});
