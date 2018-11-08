import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { CmsPageGuards } from './cms-page.guard';
import { DefaultPageService } from '../services/default-page.service';
import { CmsModuleConfig } from '../cms-module-config';
import * as fromReducers from '../store/reducers';
import { PageType } from '../../routing/models/page-context.model';
import { Page } from '../models/page.model';
import * as fromActions from '../store/actions/page.action';
import { RoutingService } from '../../routing/facade/routing.service';

const mockRoutingService = {
  routerState$: new BehaviorSubject(null)
};
const MockCmsModuleConfig: CmsModuleConfig = {
  defaultPageIdForType: {
    ProductPage: ['testProductPage']
  }
};

describe('CmsPageGuards', () => {
  let store: Store<fromReducers.CmsState>;
  let cmsPageGuards: CmsPageGuards;

  const page: Page = {
    pageId: 'testPageId',
    name: 'testPage',
    seen: [],
    slots: {}
  };
  const payload = { key: 'testPageId_ContentPage', value: page };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsPageGuards,
        DefaultPageService,
        { provide: CmsModuleConfig, useValue: MockCmsModuleConfig },
        { provide: RoutingService, useValue: mockRoutingService }
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromReducers.getReducers())
      ]
    });
    store = TestBed.get(Store);
    cmsPageGuards = TestBed.get(CmsPageGuards);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('check hasPage', () => {
    it('should return true when find the cms page by key id_type', () => {
      store.dispatch(new fromActions.LoadPageDataSuccess(payload));
      mockRoutingService.routerState$.next({
        state: {
          url: '/test',
          queryParams: {},
          params: {},
          context: { id: 'testPageId', type: PageType.CONTENT_PAGE }
        }
      });

      let result: boolean;
      cmsPageGuards.canActivate().subscribe(value => (result = value));
      expect(result).toBe(true);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromActions.UpdateLatestPageKey('testPageId_ContentPage')
      );
    });

    it('should return true when find the cms page in the seen list of the default page', () => {
      page.seen.push('123');

      store.dispatch(
        new fromActions.LoadPageDataSuccess({
          key: 'testProductPage_ProductPage',
          value: page
        })
      );
      mockRoutingService.routerState$.next({
        state: {
          url: '/test',
          queryParams: {},
          params: {},
          context: { id: '123', type: PageType.PRODUCT_PAGE }
        }
      });

      let result: boolean;
      cmsPageGuards.canActivate().subscribe(value => (result = value));
      expect(result).toBe(true);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromActions.UpdateLatestPageKey('testProductPage_ProductPage')
      );
    });

    it('should return true when find the cms page after loading', () => {
      mockRoutingService.routerState$.next({
        state: {
          url: '/test',
          queryParams: {},
          params: {},
          context: { id: 'newPageId', type: PageType.CONTENT_PAGE }
        }
      });

      let result: boolean;
      cmsPageGuards.canActivate().subscribe(value => (result = value));
      expect(!!result).toBe(false);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromActions.LoadPageData({
          id: 'newPageId',
          type: PageType.CONTENT_PAGE
        })
      );

      store.dispatch(
        new fromActions.LoadPageDataSuccess({
          key: 'newPageId_ContentPage',
          value: page
        })
      );

      expect(result).toBe(true);
    });

    it('should return false if loading cms page data error', () => {
      mockRoutingService.routerState$.next({
        state: {
          url: '/test',
          queryParams: {},
          params: {},
          context: { id: 'newPageId', type: PageType.CONTENT_PAGE }
        }
      });

      let result: boolean;
      cmsPageGuards.canActivate().subscribe(value => (result = value));
      expect(!!result).toBe(false);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromActions.LoadPageData({
          id: 'newPageId',
          type: PageType.CONTENT_PAGE
        })
      );

      store.dispatch(
        new fromActions.LoadPageDataFail({ message: 'Load Error' })
      );

      expect(!!result).toBe(false);
    });

    it('should return false if cannot find the page after loading cms data >=3 times', () => {
      mockRoutingService.routerState$.next({
        state: {
          url: '/test',
          queryParams: {},
          params: {},
          context: { id: 'newPageId', type: PageType.CONTENT_PAGE }
        }
      });

      let result: boolean;
      cmsPageGuards.canActivate().subscribe(value => (result = value));
      expect(!!result).toBe(false);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromActions.LoadPageData({
          id: 'newPageId',
          type: PageType.CONTENT_PAGE
        })
      );

      store.dispatch(
        new fromActions.LoadPageDataSuccess({
          key: 'something else',
          value: page
        })
      );

      expect(!!result).toBe(false);
      expect(store.dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
