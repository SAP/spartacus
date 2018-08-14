import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  reducerToken,
  CustomSerializer,
  reducerProvider
} from './router.reducer';
import { PageType } from '../../models/page-context.model';

@Component({
  selector: 'y-test-cmp',
  template: 'test-cmp'
})
class TestComponent {}

describe('Router Reducer', () => {
  it('should return the router state', () => {
    let router: Router;
    let store: Store<any>;

    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        StoreModule.forRoot(reducerToken),
        RouterTestingModule.withRoutes([
          { path: '', component: TestComponent },
          { path: 'category/:categoryCode', component: TestComponent },
          { path: 'product/:productCode', component: TestComponent }
        ]),
        StoreRouterConnectingModule
      ],
      providers: [
        reducerProvider,
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer
        }
      ]
    });

    store = TestBed.get(Store);
    router = TestBed.get(Router);

    let routerReducer;
    store.subscribe(routerStore => {
      routerReducer = routerStore.routerReducer;
    });

    router
      .navigateByUrl('/')
      .then(() => {
        expect(routerReducer.state).toEqual({
          url: '/',
          queryParams: {},
          params: {},
          context: { id: 'homepage', type: PageType.CONTENT_PAGE },
          cmsRequired: false
        });
        return router.navigateByUrl('category/1234');
      })
      .then(() => {
        expect(routerReducer.state).toEqual({
          url: '/category/1234',
          queryParams: {},
          params: { categoryCode: '1234' },
          context: { id: '1234', type: PageType.CATEGORY_PAGE },
          cmsRequired: false
        });
        return router.navigateByUrl('product/1234');
      })
      .then(() => {
        expect(routerReducer.state).toEqual({
          url: '/product/1234',
          queryParams: {},
          params: { productCode: '1234' },
          context: { id: '1234', type: PageType.PRODUCT_PAGE },
          cmsRequired: false
        });
      });
  });
});
