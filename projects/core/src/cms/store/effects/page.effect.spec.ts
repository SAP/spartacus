import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Action } from '@ngrx/store';

import { Observable, of, throwError } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from '../actions';
import { Logout, Login } from '../../../auth';
import { PageContext, RoutingService } from '../../../routing';
import { LanguageChange } from '../../../site-context';

import { Page, CmsStructureModel } from '../../model/page.model';
import { PageType } from '../../../occ/occ-models';
import * as fromCmsReducer from '../../../cms/store/reducers';

import * as fromEffects from './page.effect';
import { CmsPageLoader } from '../../services';

export function mockDateNow(): number {
  return 1000000000000;
}

const context: PageContext = {
  id: 'homepage',
  type: PageType.CONTENT_PAGE,
};
const mockRouterState = {
  state: {
    cmsRequired: true,
    context,
  },
};

const pageMock: Page = {
  uuid: 'mockPageUuid',
  loadTime: 1000000000000,
  name: 'testPage',
  pageId: 'testPageId',
  type: 'ContentPage',
  template: 'testTemplate',
  title: 'testPageTitle',
  catalogUuid: 'mockPageCatalogUuid',
  slots: {
    testPosition: {
      uid: 'mockContentSlotUid',
      uuid: 'mockSlotUuid',
      catalogUuid: 'mockSlotCatalogUuid',
      components: [
        {
          uid: 'comp1',
          typeCode: 'SimpleBannerComponent',
          uuid: 'compUuid1',
          flexType: 'SimpleBannerComponent',
        },
        {
          uid: 'comp2',
          typeCode: 'CMSFlexComponent',
          uuid: 'compUuid2',
          flexType: 'AccountAddressBookComponent',
        },
      ],
    },
  },
};

const componentsMock = [
  {
    uid: 'comp1',
    typeCode: 'SimpleBannerComponent',
  },
  {
    uid: 'comp2',
    typeCode: 'CMSFlexComponent',
  },
];

const pageStructure: CmsStructureModel = {
  page: pageMock,
  components: componentsMock,
};

class CmsPageLoaderMock {
  get(): Observable<any> {
    return of(pageStructure);
  }
}

class RoutingServiceMock {
  getRouterState(): Observable<any> {
    return of(mockRouterState);
  }
}

describe('Page Effects', () => {
  let actions$: Observable<Action>;
  let cmsPageLoader: CmsPageLoader<any>;
  let effects: fromEffects.PageEffects;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
      ],
      providers: [
        { provide: RoutingService, useClass: RoutingServiceMock },
        { provide: CmsPageLoader, useClass: CmsPageLoaderMock },
        fromEffects.PageEffects,
        provideMockActions(() => actions$),
      ],
    });

    cmsPageLoader = TestBed.get(CmsPageLoader);
    effects = TestBed.get(fromEffects.PageEffects);
    routingService = TestBed.get(RoutingService);
    Date.now = mockDateNow;
  });

  describe('loadPageData$', () => {
    describe('when LoadPageData is dispatched', () => {
      it('should dispatch LoadPageDataSuccess and GetComponentFromPage actions', () => {
        spyOn(cmsPageLoader, 'get').and.returnValue(of(pageStructure));
        const action = new fromActions.LoadPageData(context);

        const completion1 = new fromActions.LoadPageDataSuccess(
          context,
          pageMock
        );
        const completion2 = new fromActions.GetComponentFromPage(
          componentsMock
        );

        actions$ = hot('-a', { a: action });
        const expected = cold('-(bc)', {
          b: completion1,
          c: completion2,
        });

        expect(effects.loadPageData$).toBeObservable(expected);
      });

      it('should dispatch LoadPageDataFail action', () => {
        const error = 'error';
        spyOn<any>(cmsPageLoader, 'get').and.returnValue(throwError(error));
        const action = new fromActions.LoadPageData(context);

        const completion = new fromActions.LoadPageDataFail(context, error);

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', {
          b: completion,
        });

        expect(effects.loadPageData$).toBeObservable(expected);
      });
    });
  });

  describe('refreshPage$', () => {
    describe('when a language changes', () => {
      it('should dispatch LoadPageIndex action', () => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockRouterState)
        );

        const action = new LanguageChange();
        const completion = new fromActions.LoadPageData(context);

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effects.refreshPage$).toBeObservable(expected);
      });
    });
    describe('when a user logs in', () => {
      it('should dispatch LoadPageIndex action', () => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockRouterState)
        );

        const action = new Logout();
        const completion = new fromActions.LoadPageData(context);

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effects.refreshPage$).toBeObservable(expected);
      });
    });
    describe('when a user logs out', () => {
      it('should dispatch LoadPageIndex action', () => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockRouterState)
        );

        const action = new Login();
        const completion = new fromActions.LoadPageData(context);

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effects.refreshPage$).toBeObservable(expected);
      });
    });
  });
});
