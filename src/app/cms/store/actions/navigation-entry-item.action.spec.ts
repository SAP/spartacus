import * as fromAction from './navigation-entry-item.action';

describe('Navigation Entry Item Actions', () => {
  describe('LoadNavigationItems Actions', () => {
    describe('LoadNavigationItems', () => {
      it('should create an action', () => {
        const payload = {
          nodeId: 'test_uid',
          items: ['mockSuperType1', 'mockId1']
        };

        const action = new fromAction.LoadNavigationItems(payload);
        expect({ ...action }).toEqual({
          type: fromAction.LOAD_NAVIGATION_ITEMS,
          payload: payload
        });
      });
    });

    describe('LoadNavigationItemsFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromAction.LoadNavigationItemsFail(payload);

        expect({ ...action }).toEqual({
          type: fromAction.LOAD_NAVIGATION_ITEMS_FAIL,
          payload
        });
      });
    });

    describe('LoadNavigationItemsSuccess', () => {
      it('should create an action', () => {
        const payload = {
          nodeId: 'test_uid',
          items: ['mockSuperType1', 'mockId1']
        };

        const action = new fromAction.LoadNavigationItemsSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromAction.LOAD_NAVIGATION_ITEMS_SUCCESS,
          payload
        });
      });
    });
  });
});
