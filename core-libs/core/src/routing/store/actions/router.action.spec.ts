import { PageType } from '@spartacus/core';
import { RoutingActions } from './index';

describe('Router Actions', () => {
  describe('Change Next PageContext Action', () => {
    it('should create an action', () => {
      const context = { id: 'a', type: PageType.CONTENT_PAGE };
      const action = new RoutingActions.ChangeNextPageContext(context);
      expect({ ...action }).toEqual({
        type: RoutingActions.CHANGE_NEXT_PAGE_CONTEXT,
        payload: context,
      });
    });
  });
});
