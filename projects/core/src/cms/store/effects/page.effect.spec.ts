import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from '../actions';
import { Logout, Login } from '../../../auth';
import { PageContext, RoutingService } from '../../../routing';
import { LanguageChange } from '../../../site-context';
import { CmsConfig } from '../../config/cms-config';
import { defaultCmsModuleConfig } from '../../config/default-cms-config';
import { Page } from '../../model/page.model';
import { OccCmsService } from '../../occ/occ-cms.service';
import { DefaultPageService } from '../../services/default-page.service';
import { PageType, CmsComponent } from '../../../occ/occ-models';
import * as fromCmsReducer from '../../../cms/store/reducers';

import * as fromEffects from './page.effect';

export function mockDateNow(): number {
  return 1000000000000;
}

const context: PageContext = {
  id: 'homepage',
  type: PageType.CONTENT_PAGE
};
const mockRouterState = {
  state: {
    cmsRequired: true,
    context
  }
};

class RoutingServiceMock {
  getRouterState(): Observable<any> {
    return of(mockRouterState);
  }
}

describe('Page Effects', () => {
  let actions$: Observable<Action>;
  let occService: OccCmsService;
  let defaultPageService: DefaultPageService;
  let effects: fromEffects.PageEffects;
  let routingService: RoutingService;

  const cmsComponentData: any[] = [
    {
      uid: 'comp1',
      typeCode: 'SimpleBannerComponent',
      uuid: 'compUuid1'
    },
    {
      uid: 'comp2',
      typeCode: 'CMSLinkComponent',
      uuid: 'compUuid2'
    }
  ];

  const cmsPageData: any = {
    uuid: 'mockPageUuid',
    uid: 'testPageId',
    name: 'testPage',
    template: 'testTemplate',
    title: 'testPageTitle',
    contentSlots: {
      contentSlot: [
        {
          slotId: 'mockContentSlotUid',
          slotUuid: 'mockSlotUuid',
          components: {
            component: cmsComponentData
          },
          position: 'testPosition',
          properties: {
            smartedit: {
              catalogVersionUuid: 'mockSlotCatalogUuid'
            }
          }
        }
      ]
    },
    properties: {
      smartedit: {
        classes:
          'smartedit-page-uid-homepage smartedit-catalog-version-uuid-mockPageCatalogUuid'
      }
    }
  };

  const comps: any[] = [
    {
      uid: 'comp1',
      typeCode: 'SimpleBannerComponent',
      uuid: 'compUuid1',
      catalogUuid: undefined
    },
    {
      uid: 'comp2',
      typeCode: 'CMSLinkComponent',
      uuid: 'compUuid2',
      catalogUuid: undefined
    }
  ];

  const page: Page = {
    uuid: 'mockPageUuid',
    loadTime: 1000000000000,
    name: 'testPage',
    pageId: 'testPageId',
    template: 'testTemplate',
    title: 'testPageTitle',
    catalogUuid: 'mockPageCatalogUuid',
    slots: {
      testPosition: {
        uid: 'mockContentSlotUid',
        uuid: 'mockSlotUuid',
        catalogUuid: 'mockSlotCatalogUuid',
        components: comps
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers())
      ],
      providers: [
        OccCmsService,
        { provide: RoutingService, useClass: RoutingServiceMock },
        { provide: CmsConfig, useValue: defaultCmsModuleConfig },
        DefaultPageService,
        fromEffects.PageEffects,
        provideMockActions(() => actions$)
      ]
    });

    occService = TestBed.get(OccCmsService);
    defaultPageService = TestBed.get(DefaultPageService);
    effects = TestBed.get(fromEffects.PageEffects);
    routingService = TestBed.get(RoutingService);
    Date.now = mockDateNow;

    spyOn(occService, 'loadPageData').and.returnValue(of(cmsPageData));
    spyOn(defaultPageService, 'getDefaultPageIdsBytype').and.returnValue([
      'productList'
    ]);
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

  describe('loadPageData$', () => {
    describe('when LoadPageData is dispatched', () => {
      it('should dispatch LoadPageDataSuccess and GetComponentFromPage actions', () => {
        const mockedComponents: CmsComponent[] = [{ name: 'aComponent' }];
        spyOn<any>(effects, 'getComponents').and.returnValue(mockedComponents);

        const action = new fromActions.LoadPageData(context);

        const completion1 = new fromActions.LoadPageDataSuccess(context, page);
        const completion2 = new fromActions.GetComponentFromPage(
          mockedComponents
        );

        actions$ = hot('-a', { a: action });
        const expected = cold('-(bc)', {
          b: completion1,
          c: completion2
        });

        expect(effects.loadPageData$).toBeObservable(expected);
      });

      it('should dispatch LoadPageDataFail action', () => {
        const error = 'error';
        spyOn<any>(effects, 'getPageData').and.throwError(error);

        const action = new fromActions.LoadPageData(context);

        const completion = new fromActions.LoadPageDataFail(
          context,
          new Error(error)
        );

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', {
          b: completion
        });

        expect(effects.loadPageData$).toBeObservable(expected);
      });
    });
  });
});
