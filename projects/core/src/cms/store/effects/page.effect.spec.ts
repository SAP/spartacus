import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import * as fromCmsReducer from '../../../cms/store/reducers';
import { PageType } from '../../../model/cms.model';
import { PageContext, RoutingService } from '../../../routing/index';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { CmsPageConnector } from '../../connectors/page/cms-page.connector';
import { CmsStructureModel, Page } from '../../model/page.model';
import { CmsActions } from '../actions/index';
import { CMS_FEATURE } from '../cms-state';
import * as fromEffects from './page.effect';
import { HttpErrorResponse } from '@angular/common/http';
import { normalizeHttpError } from '@spartacus/core';

function mockDateNow(): number {
  return 1000000000000;
}

const pageContext: PageContext = {
  id: 'homepage',
  type: PageType.CONTENT_PAGE,
};
const mockRouterState = {
  state: {
    cmsRequired: true,
    context: pageContext,
  },
};

const pageMock: Page = {
  loadTime: 1000000000000,
  name: 'testPage',
  pageId: 'testPageId',
  type: 'ContentPage',
  template: 'testTemplate',
  title: 'testPageTitle',
  slots: {
    testPosition: {
      components: [
        {
          uid: 'comp1',
          typeCode: 'SimpleBannerComponent',
          flexType: 'SimpleBannerComponent',
        },
        {
          uid: 'comp2',
          typeCode: 'CMSFlexComponent',
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

class MockCmsPageConnector {
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
  let cmsPageConnector: CmsPageConnector;
  let effects: fromEffects.PageEffects;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(CMS_FEATURE, fromCmsReducer.getReducers()),
      ],
      providers: [
        { provide: RoutingService, useClass: RoutingServiceMock },
        { provide: CmsPageConnector, useClass: MockCmsPageConnector },
        fromEffects.PageEffects,
        provideMockActions(() => actions$),
      ],
    });

    cmsPageConnector = TestBed.inject(CmsPageConnector);
    effects = TestBed.inject(fromEffects.PageEffects);
    routingService = TestBed.inject(RoutingService);
    Date.now = mockDateNow;
  });

  describe('loadPageData$', () => {
    describe('when LoadPageData is dispatched', () => {
      it('should dispatch LoadPageDataSuccess and GetComponentFromPage actions', () => {
        spyOn(cmsPageConnector, 'get').and.returnValue(of(pageStructure));
        const action = new CmsActions.LoadCmsPageData(pageContext);

        const completion1 = new CmsActions.CmsGetComponentFromPage(
          componentsMock.map((component) => ({ component, pageContext }))
        );
        const completion2 = new CmsActions.LoadCmsPageDataSuccess(
          pageContext,
          pageMock
        );

        actions$ = hot('-a', { a: action });
        const expected = cold('-(bc)', {
          b: completion1,
          c: completion2,
        });

        expect(effects.loadPageData$).toBeObservable(expected);
      });

      it('should dispatch LoadPageDataFail action', () => {
        const error = new HttpErrorResponse({ error: 'error' });
        spyOn<any>(cmsPageConnector, 'get').and.returnValue(throwError(error));
        const action = new CmsActions.LoadCmsPageData(pageContext);

        const completion = new CmsActions.LoadCmsPageDataFail(
          pageContext,
          normalizeHttpError(error)
        );

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
          of(mockRouterState as any)
        );

        const action = new SiteContextActions.LanguageChange({
          previous: 'previous',
          current: 'current',
        });
        const completion = new CmsActions.LoadCmsPageData(pageContext);

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effects.refreshPage$).toBeObservable(expected);
      });
    });
    describe('when a user logs in', () => {
      it('should dispatch LoadPageIndex action', () => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockRouterState as any)
        );

        const action = new AuthActions.Logout();
        const completion = new CmsActions.LoadCmsPageData(pageContext);

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effects.refreshPage$).toBeObservable(expected);
      });
    });
    describe('when a user logs out', () => {
      it('should dispatch LoadPageIndex action', () => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockRouterState as any)
        );

        const action = new AuthActions.Login();
        const completion = new CmsActions.LoadCmsPageData(pageContext);

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effects.refreshPage$).toBeObservable(expected);
      });
    });
  });
});
