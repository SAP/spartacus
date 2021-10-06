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
import { HOME_PAGE_CONTEXT, PageContext } from '@spartacus/core';
import { PageType } from '../../../model/cms.model';
import { RoutingConfig } from '../../configurable-routes/config/routing-config';
import { ChangeNextPageContext } from '../actions/router.action';
import { RouterState } from '../routing-state';
import * as fromReducer from './router.reducer';

@Component({
  selector: 'cx-test-cmp',
  template: 'test-cmp',
})
class TestComponent {}

export enum SemanticRoutes {
  PRODUCT = 'product',
  CATEGORY = 'category',
  BRAND = 'brand',
  SEARCH = 'search',
  HOME = 'home',
}

describe('Router Reducer', () => {
  let router: Router;
  let store: Store<any>;
  let zone: NgZone;

  beforeEach(() => {
    const mockConfig: RoutingConfig = {
      routing: {
        routes: {
          termsAndConditions: { paths: ['terms-and-conditions'] },
          home: { paths: [''] },
        },
      },
    };

    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        StoreModule.forRoot(fromReducer.reducerToken),
        RouterTestingModule.withRoutes([
          { path: '', component: TestComponent },
          {
            path: 'category/:categoryCode',
            component: TestComponent,
            data: { cxRoute: SemanticRoutes.CATEGORY },
          },
          {
            path: 'product/:productCode',
            component: TestComponent,
            data: { cxRoute: SemanticRoutes.PRODUCT },
          },
          {
            path: 'brand/:brandCode',
            component: TestComponent,
            data: { cxRoute: SemanticRoutes.BRAND },
          },
          {
            path: 'search/:query',
            component: TestComponent,
            data: { cxRoute: SemanticRoutes.SEARCH },
          },
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
        {
          provide: RoutingConfig,
          useValue: mockConfig,
        },
      ],
    });

    zone = TestBed.inject(NgZone);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
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
        expect(state.state).toEqual(action.payload.routerState);
      });
      it('should clear nextState', () => {
        const initialState: RouterState = {
          ...fromReducer.initialState,
          nextState: {
            url: '',
            queryParams: {},
            params: {},
            context: {
              id: '',
            },
            cmsRequired: false,
            semanticRoute: '',
          },
        };
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_NAVIGATED,
        };
        const state = fromReducer.reducer(initialState, action);
        expect(state.nextState).toBe(undefined);
      });
      it('should prioritize context from the next state', () => {
        const initialState: RouterState = {
          ...fromReducer.initialState,
          nextState: {
            url: '',
            queryParams: {},
            params: {},
            context: {
              id: 'nextContext',
            },
            cmsRequired: false,
            semanticRoute: '',
          },
        };
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_NAVIGATED,
        };
        const state = fromReducer.reducer(initialState, action);
        expect(state.state.context).toEqual({ id: 'nextContext' });
      });
      it('should ignore context from the next state if undefined', () => {
        const initialState: RouterState = {
          ...fromReducer.initialState,
          nextState: {
            url: '',
            queryParams: {},
            params: {},
            context: null,
            cmsRequired: false,
            semanticRoute: '',
          },
        };
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_NAVIGATED,
        };
        const state = fromReducer.reducer(initialState, action);
        expect(state.state.context).toEqual({ id: 'homepage' });
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

  describe('should return the router state', () => {
    let routerReducer;
    beforeEach(() => {
      store.subscribe((routerStore) => {
        routerReducer = routerStore.router;
      });
    });

    it('for home page', async () => {
      await zone.run(() => router.navigateByUrl('/'));
      expect(routerReducer.state).toEqual({
        url: '/',
        queryParams: {},
        params: {},
        context: { id: HOME_PAGE_CONTEXT, type: PageType.CONTENT_PAGE },
        cmsRequired: false,
        semanticRoute: SemanticRoutes.HOME,
      });
    });

    it('for category page', async () => {
      await zone.run(() => router.navigateByUrl('category/1234'));
      expect(routerReducer.state).toEqual({
        url: '/category/1234',
        queryParams: {},
        params: { categoryCode: '1234' },
        context: { id: '1234', type: PageType.CATEGORY_PAGE },
        cmsRequired: false,
        semanticRoute: SemanticRoutes.CATEGORY,
      });
    });

    it('for product page', async () => {
      await zone.run(() => router.navigateByUrl('product/1234'));
      expect(routerReducer.state).toEqual({
        url: '/product/1234',
        queryParams: {},
        params: { productCode: '1234' },
        context: { id: '1234', type: PageType.PRODUCT_PAGE },
        cmsRequired: false,
        semanticRoute: SemanticRoutes.PRODUCT,
      });
    });

    it('for brand page', async () => {
      await zone.run(() => router.navigateByUrl('brand/999'));
      expect(routerReducer.state).toEqual({
        url: '/brand/999',
        queryParams: {},
        params: { brandCode: '999' },
        context: { id: '999', type: PageType.CATEGORY_PAGE },
        cmsRequired: false,
        semanticRoute: SemanticRoutes.BRAND,
      });
    });

    it('for route with `data.cxRoute` property', async () => {
      await zone.run(() => router.navigateByUrl('search/camera'));
      expect(routerReducer.state).toEqual({
        url: '/search/camera',
        queryParams: {},
        params: { query: 'camera' },

        // In the reducer we assume for content pages that: pageContext.id (pageLabel) equals URL
        // Note: later on backend may return the corrected page label (i.e. `/search`).
        context: { id: '/search/camera', type: PageType.CONTENT_PAGE },

        cmsRequired: false,
        semanticRoute: SemanticRoutes.SEARCH,
      });
    });

    it('for unknown content page', async () => {
      await zone.run(() => router.navigateByUrl('/sales'));
      expect(routerReducer.state).toEqual({
        url: '/sales',
        queryParams: {},
        params: {},
        context: { id: '/sales', type: PageType.CONTENT_PAGE },
        cmsRequired: false,
        semanticRoute: undefined,
      });
    });
  });

  describe('should set correct context for content pages', () => {
    let context;

    beforeEach(async () => {
      store.subscribe((routerStore) => {
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

  describe('should set correct semanticRoute', () => {
    let semanticRoute;

    beforeEach(async () => {
      store.subscribe((routerStore) => {
        semanticRoute = routerStore.router.state.semanticRoute;
      });
    });

    it('for product page', async () => {
      await zone.run(() => router.navigateByUrl('/product/123'));
      expect(semanticRoute).toEqual(SemanticRoutes.PRODUCT);
    });

    it('for category page', async () => {
      await zone.run(() => router.navigateByUrl('/category/1234'));
      expect(semanticRoute).toEqual(SemanticRoutes.CATEGORY);
    });

    it('for brand page', async () => {
      await zone.run(() => router.navigateByUrl('/brand/999'));
      expect(semanticRoute).toEqual(SemanticRoutes.BRAND);
    });

    it('for route with `data.cxRoute` property', async () => {
      await zone.run(() => router.navigateByUrl('/search/cameras'));
      expect(semanticRoute).toEqual('search');
    });

    it('for any page that has no dedicated Route, but configured semantic path', async () => {
      await zone.run(() => router.navigateByUrl('/terms-and-conditions'));
      expect(semanticRoute).toEqual('termsAndConditions');
    });

    it('for unknown route - undefined', async () => {
      await zone.run(() => router.navigateByUrl('/sales'));
      expect(semanticRoute).toEqual(undefined);
    });
  });

  describe('CHANGE_NEXT_PAGE_CONTEXT action', () => {
    it('should return the default state if no next state is present', () => {
      const { initialState } = fromReducer;
      const pageContext: PageContext = {
        type: PageType.CONTENT_PAGE,
        id: 'test',
      };
      const action = new ChangeNextPageContext(pageContext);
      const state = fromReducer.reducer(initialState, action);
      expect(state).toBe(initialState);
    });

    it('should change page context in next state', () => {
      let state: RouterState = {
        ...fromReducer.initialState,
        nextState: {
          ...fromReducer.initialState.state,
          context: {
            id: 'initial',
            type: PageType.CATEGORY_PAGE,
          },
        },
      };
      const pageContext: PageContext = {
        type: PageType.CONTENT_PAGE,
        id: 'test',
      };
      const action = new ChangeNextPageContext(pageContext);
      state = fromReducer.reducer(state, action);
      expect(state.nextState.context).toBe(pageContext);
    });
  });
});
