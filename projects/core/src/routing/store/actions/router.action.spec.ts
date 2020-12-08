import { RoutingActions } from './index';
import { PageType } from '@spartacus/core';

describe('Router Actions', () => {
  describe('Route Go Action', () => {
    it('should create an action', () => {
      const payload: { path: string[] } = {
        path: ['test'],
      };
      const action = new RoutingActions.RouteGoAction(payload);
      expect({ ...action }).toEqual({
        type: RoutingActions.ROUTER_GO,
        payload: payload,
      });
    });
  });

  describe('Route GoByUrl Action', () => {
    it('should create an action', () => {
      const payload = 'test';
      const action = new RoutingActions.RouteGoByUrlAction(payload);
      expect({ ...action }).toEqual({
        type: RoutingActions.ROUTER_GO_BY_URL,
        payload: payload,
      });
    });
  });

  describe('Route Back Action', () => {
    it('should create an action', () => {
      const action = new RoutingActions.RouteBackAction();
      expect({ ...action }).toEqual({
        type: RoutingActions.ROUTER_BACK,
      });
    });
  });

  describe('Route Forward Action', () => {
    it('should create an action', () => {
      const action = new RoutingActions.RouteForwardAction();
      expect({ ...action }).toEqual({
        type: RoutingActions.ROUTER_FORWARD,
      });
    });
  });

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
