import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromNgrxRouter from '@ngrx/router-store';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { PageType } from '../../../model/cms.model';
import * as fromReducer from './router.reducer';

@Component({
  selector: 'cx-test-cmp',
  template: 'test-cmp',
})
class TestComponent {}

describe('Router Reducer', () => {
  let router: Router;
  let store: Store<any>;
  let zone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        StoreModule.forRoot(fromReducer.reducerToken),
        RouterTestingModule.withRoutes([
          { path: '', component: TestComponent },
          { path: 'category/:categoryCode', component: TestComponent },
          { path: 'product/:productCode', component: TestComponent },
          {
            path: 'cmsPage',
            component: TestComponent,
            data: { pageLabel: 'testPageLabel' },
          },
          {
            path: 'dynamically-created',
            component: TestComponent,
            children: [{ path: 'sub-route', component: TestComponent }],
            data: {
              cxCmsRouteContext: {
                type: PageType.CONTENT_PAGE,
                id: 'explicit',
              },
            },
          },
          { path: '**', component: TestComponent },
        ]),
        StoreRouterConnectingModule.forRoot(),
      ],
      providers: [
        fromReducer.reducerProvider,
        {
          provide: RouterStateSerializer,
          useClass: fromReducer.CustomSerializer,
        },
      ],
    });

    zone = TestBed.get(NgZone);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  describe('Default/undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ROUTER_NAVIGATED, ROUTER_ERROR, ROUTER_CANCEL action', () => {
    const templateAction = {
      type: '',
      payload: {
        routerState: {
          url: '',
          queryParams: {},
          params: {},
          context: { id: 'homepage' },
          cmsRequired: true,
        },
        event: {
          id: 1,
          url: '/',
          urlAfterRedirects: '/',
        },
      },
    };

    describe('ROUTER_NAVIGATION', () => {
      it('should should populate the nextState', () => {
        const { initialState } = fromReducer;
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_NAVIGATION,
        };
        const state = fromReducer.reducer(initialState, action);
        expect(state.nextState).toBe(action.payload.routerState);
      });
    });

    describe('ROUTER_NAVIGATED', () => {
      it('should should populate the state and the navigationId', () => {
        const { initialState } = fromReducer;
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_NAVIGATED,
        };
        const state = fromReducer.reducer(initialState, action);
        expect(state.state).toBe(action.payload.routerState);
      });
      it('should clear nextState', () => {
        const initialState: fromReducer.RouterState = {
          ...fromReducer.initialState,
          nextState: {
            url: '',
            queryParams: {},
            params: {},
            context: {
              id: '',
            },
            cmsRequired: false,
          },
        };
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_NAVIGATED,
        };
        const state = fromReducer.reducer(initialState, action);
        expect(state.nextState).toBe(undefined);
      });
    });

    describe('ROUTER_ERROR', () => {
      it('should clear next state', () => {
        const { initialState } = fromReducer;
        const beforeState = { ...initialState, nextState: initialState.state };
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_ERROR,
        };
        const state = fromReducer.reducer(beforeState, action);
        expect(state.nextState).toBe(undefined);
      });
    });

    describe('ROUTER_CANCEL', () => {
      it('should clear next state', () => {
        const { initialState } = fromReducer;
        const beforeState = { ...initialState, nextState: initialState.state };
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_CANCEL,
        };
        const state = fromReducer.reducer(beforeState, action);
        expect(state.nextState).toBe(undefined);
      });
    });
  });

  it('should return the router state', async () => {
    let routerReducer;
    store.subscribe(routerStore => {
      routerReducer = routerStore.router;
    });

    await zone.run(() => router.navigateByUrl('/'));
    expect(routerReducer.state).toEqual({
      url: '/',
      queryParams: {},
      params: {},
      context: { id: 'homepage', type: PageType.CONTENT_PAGE },
      cmsRequired: false,
    });

    await zone.run(() => router.navigateByUrl('category/1234'));
    expect(routerReducer.state).toEqual({
      url: '/category/1234',
      queryParams: {},
      params: { categoryCode: '1234' },
      context: { id: '1234', type: PageType.CATEGORY_PAGE },
      cmsRequired: false,
    });

    await zone.run(() => router.navigateByUrl('product/1234'));
    expect(routerReducer.state).toEqual({
      url: '/product/1234',
      queryParams: {},
      params: { productCode: '1234' },
      context: { id: '1234', type: PageType.PRODUCT_PAGE },
      cmsRequired: false,
    });
  });

  describe('should set correct context for content pages', () => {
    let context;

    beforeEach(async () => {
      store.subscribe(routerStore => {
        context = routerStore.router.state.context;
      });
    });

    it('for generic page', async () => {
      await zone.run(() => router.navigateByUrl('/customCmsPage'));
      expect(context).toEqual({
        id: '/customCmsPage',
        type: PageType.CONTENT_PAGE,
      });
    });

    it('for generic page with slashes', async () => {
      await zone.run(() => router.navigateByUrl('/custom-cms/page'));
      expect(context).toEqual({
        id: '/custom-cms/page',
        type: PageType.CONTENT_PAGE,
      });
    });

    it('for route defined with page label', async () => {
      await zone.run(() => router.navigateByUrl('/cmsPage'));
      expect(context).toEqual({
        id: 'testPageLabel',
        type: PageType.CONTENT_PAGE,
      });
    });

    it('for route with cxCmsRouteContext context', async () => {
      await zone.run(() => router.navigateByUrl('/dynamically-created'));
      expect(context).toEqual({ id: 'explicit', type: PageType.CONTENT_PAGE });
    });

    it('for sub route route with cxCmsRouteContext context', async () => {
      await zone.run(() =>
        router.navigateByUrl('dynamically-created/sub-route')
      );
      expect(context).toEqual({ id: 'explicit', type: PageType.CONTENT_PAGE });
    });
  });

  describe('getRouterFeatureState', () => {
    it('should return the next page context', () => {
      const { initialState } = fromReducer;
      const mockState = { router: { router: initialState } };
      const result = fromReducer.getRouterFeatureState(mockState);
      expect(result).toEqual({ router: initialState });
    });
  });

  describe('getRouterState;', () => {
    it('should return the next page context', () => {
      const { initialState } = fromReducer;
      const mockState = { router: { router: initialState } };
      const result = fromReducer.getRouterState(mockState);
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
      const result = fromReducer.getPageContext(mockState);
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
      const result = fromReducer.getNextPageContext(mockState);
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
      const result = fromReducer.isNavigating(mockState);
      expect(result).toBe(true);
    });

    it('should return false if  nextState is not set', () => {
      const mockState = { router: { router: { nextState: undefined } } };
      const result = fromReducer.isNavigating(mockState);
      expect(result).toBe(false);
    });
  });
});
