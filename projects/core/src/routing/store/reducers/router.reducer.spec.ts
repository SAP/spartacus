import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromReducer from './router.reducer';
import * as fromAction from './../actions/';
import * as fromNgrxRouter from '@ngrx/router-store';

import { PageType } from '../../../occ/occ-models/index';

@Component({
  selector: 'cx-test-cmp',
  template: 'test-cmp'
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
          { path: 'product/:productCode', component: TestComponent }
        ]),
        StoreRouterConnectingModule
      ],
      providers: [
        fromReducer.reducerProvider,
        {
          provide: RouterStateSerializer,
          useClass: fromReducer.CustomSerializer
        }
      ]
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

  describe('SAVE_REDIRECT_URL action', () => {
    it('should save the redirect url in the store', () => {
      const action = new fromAction.SaveRedirectUrl('/test');
      const state = fromReducer.reducer(undefined, action);
      expect(state.redirectUrl).toBe('/test');
    });
  });

  describe('CLEAR_REDIRECT_URL action', () => {
    it('should clear the redirectUrl from the store', () => {
      const { initialState } = fromReducer;
      const action = new fromAction.ClearRedirectUrl();
      const state = fromReducer.reducer(initialState, action);
      expect(state.redirectUrl).toBe('');
    });
  });

  describe('ROUTER_NAVIGATION, ROUTER_ERROR, ROUTER_CANCEL action', () => {
    const templateAction = {
      type: '',
      payload: {
        routerState: {
          url: '',
          queryParams: {},
          params: {},
          context: { id: 'homepage' },
          cmsRequired: true
        },
        event: {
          id: 1,
          url: '/',
          urlAfterRedirects: '/'
        }
      }
    };

    it(`should not clear redirect URL if user is at
     /login, /register or the same page as the redirectUrl. Else, it should clear it`, () => {
      const { initialState } = fromReducer;
      initialState.redirectUrl = '/checkout';

      const action = {
        ...templateAction,
        type: fromNgrxRouter.ROUTER_NAVIGATION
      };

      action.payload.routerState.url = '/login';
      const state1 = fromReducer.reducer(initialState, action);
      expect(state1.redirectUrl).toBe('/checkout');

      action.payload.routerState.url = '/register';
      const state2 = fromReducer.reducer(initialState, action);
      expect(state2.redirectUrl).toBe('/checkout');

      action.payload.routerState.url = '/checkout';
      const state3 = fromReducer.reducer(initialState, action);
      expect(state3.redirectUrl).toBe('/checkout');

      action.payload.routerState.url = '/';
      const state4 = fromReducer.reducer(initialState, action);
      expect(state4.redirectUrl).toBe('');
    });

    describe('ROUTER_NAVIGATION', () => {
      it('should should populate the state and the navigationId', () => {
        const { initialState } = fromReducer;
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_NAVIGATION
        };
        const state = fromReducer.reducer(initialState, action);
        expect(state.state).toBe(action.payload.routerState);
      });
    });

    describe('ROUTER_ERROR', () => {
      it('should should populate the state and the navigationId', () => {
        const { initialState } = fromReducer;
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_ERROR
        };
        const state = fromReducer.reducer(initialState, action);
        expect(state.state).toBe(action.payload.routerState);
      });
    });

    describe('ROUTER_CANCEL', () => {
      it('should should populate the state and the navigationId', () => {
        const { initialState } = fromReducer;
        const action = {
          ...templateAction,
          type: fromNgrxRouter.ROUTER_CANCEL
        };
        const state = fromReducer.reducer(initialState, action);
        expect(state.state).toBe(action.payload.routerState);
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
      cmsRequired: false
    });

    await zone.run(() => router.navigateByUrl('category/1234'));
    expect(routerReducer.state).toEqual({
      url: '/category/1234',
      queryParams: {},
      params: { categoryCode: '1234' },
      context: { id: '1234', type: PageType.CATEGORY_PAGE },
      cmsRequired: false
    });

    await zone.run(() => router.navigateByUrl('product/1234'));
    expect(routerReducer.state).toEqual({
      url: '/product/1234',
      queryParams: {},
      params: { productCode: '1234' },
      context: { id: '1234', type: PageType.PRODUCT_PAGE },
      cmsRequired: false
    });
  });
});
