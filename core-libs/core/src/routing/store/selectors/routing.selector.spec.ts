import { PageType } from '../../../model/cms.model';
import * as fromReducer from '../reducers/router.reducer';
import { RoutingSelector } from '../selectors/index';

describe('Routing selectors', () => {
  describe('getRouterFeatureState', () => {
    it('should return the next page context', () => {
      const { initialState } = fromReducer;
      const mockState = { router: { router: initialState } };
      const result = RoutingSelector.getRouterFeatureState(mockState);
      expect(result).toEqual({ router: initialState });
    });
  });

  describe('getSemanticRoute', () => {
    it('should return the cxRoute', () => {
      const semanticRoute = 'search';
      const mockState = { router: { router: { state: { semanticRoute } } } };
      const result = RoutingSelector.getSemanticRoute(mockState);
      expect(result).toEqual(semanticRoute);
    });
  });

  describe('getRouterState;', () => {
    it('should return the next page context', () => {
      const { initialState } = fromReducer;
      const mockState = { router: { router: initialState } };
      const result = RoutingSelector.getRouterState(mockState);
      expect(result).toEqual(initialState);
    });
  });

  describe('getPageContext', () => {
    it('should return the next page context', () => {
      const context = {
        id: 'testPageLabel',
        type: PageType.CONTENT_PAGE,
      };
      const mockState = { router: { router: { state: { context } } } };
      const result = RoutingSelector.getPageContext(mockState);
      expect(result).toEqual(context);
    });
  });

  describe('getNextPageContext', () => {
    it('should return the next page context', () => {
      const context = {
        id: 'testPageLabel',
        type: PageType.CONTENT_PAGE,
      };
      const mockState = { router: { router: { nextState: { context } } } };
      const result = RoutingSelector.getNextPageContext(mockState);
      expect(result).toEqual(context);
    });
  });

  describe('isNavigating', () => {
    it('should return true while nextState is set', () => {
      const context = {
        id: 'testPageLabel',
        type: PageType.CONTENT_PAGE,
      };
      const mockState = { router: { router: { nextState: { context } } } };
      const result = RoutingSelector.isNavigating(mockState);
      expect(result).toBe(true);
    });

    it('should return false if  nextState is not set', () => {
      const mockState = { router: { router: { nextState: undefined } } };
      const result = RoutingSelector.isNavigating(mockState);
      expect(result).toBe(false);
    });
  });
});
