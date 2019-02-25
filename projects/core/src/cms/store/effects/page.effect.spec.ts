import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccCmsService } from '../../occ/occ-cms.service';
import { DefaultPageService } from '../../services/default-page.service';
import { CmsConfig } from '../../config/cms-config';
import * as fromEffects from './page.effect';
import * as fromActions from '../actions';
import { Page } from '../../model/page.model';
import { PageType } from '../../../occ/occ-models';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import * as fromCmsReducer from '../../../cms/store/reducers';
import { PageContext, RoutingService } from '../../../routing';
import { defaultCmsModuleConfig } from '../../config/default-cms-config';

export function mockDateNow(): number {
  return 1000000000000;
}

const mockRouterState = {
  state: {
    cmsRequired: true,
    context: {}
  }
};

const mockRoutingService = {
  routerState$: of(mockRouterState)
};

describe('Page Effects', () => {
  let actions$: Observable<any>;
  let occService: OccCmsService;
  let defaultPageService: DefaultPageService;
  let effects: fromEffects.PageEffects;

  const cmsComponentData: any[] = [
    {
      uid: 'comp1',
      typeCode: 'SimpleBannerComponent',
      uuid: 'compUuid1',
      flextype: undefined
    },
    {
      uid: 'comp2',
      typeCode: 'FlexCmsComponent',
      uuid: 'compUuid2',
      flextype: 'AccountAddressBookComponent'
    }
  ];

  const cmsPageData: any = {
    uuid: 'mockPageUuid',
    uid: 'testPageId',
    name: 'testPage',
    template: 'testTemplate',
    title: 'testPageTitle',
    typeCode: 'ContentPage',
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
      catalogUuid: undefined,
      flextype: undefined
    },
    {
      uid: 'comp2',
      typeCode: 'FlexCmsComponent',
      uuid: 'compUuid2',
      catalogUuid: undefined,
      flextype: 'AccountAddressBookComponent'
    }
  ];

  const page: Page = {
    uuid: 'mockPageUuid',
    loadTime: 1000000000000,
    name: 'testPage',
    pageId: 'testPageId',
    type: 'ContentPage',
    template: 'testTemplate',
    title: 'testPageTitle',
    seen: new Array<string>(),
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
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: CmsConfig, useValue: defaultCmsModuleConfig },
        DefaultPageService,
        fromEffects.PageEffects,
        provideMockActions(() => actions$)
      ]
    });

    occService = TestBed.get(OccCmsService);
    defaultPageService = TestBed.get(DefaultPageService);
    effects = TestBed.get(fromEffects.PageEffects);
    Date.now = mockDateNow;

    spyOn(occService, 'loadPageData').and.returnValue(of(cmsPageData));
    spyOn(defaultPageService, 'getDefaultPageIdsBytype').and.returnValue([
      'productList'
    ]);
  });

  describe('loadPage$', () => {
    it('should emit actions LoadPageDataSuccess and GetComponentFromPage for ContentPage type', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE
      };

      const action = new fromActions.LoadPageData(context);

      page.seen.push(context.id);
      const pageKey = page.pageId + '_' + context.type;
      const payload = { key: pageKey, value: page };

      const completion1 = new fromActions.LoadPageDataSuccess(payload);
      const completion2 = new fromActions.GetComponentFromPage(
        cmsComponentData
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.loadPage$).toBeObservable(expected);
    });

    it('should emit actions LoadPageDataSuccess and GetComponentFromPage for non-ContentPage type (specific)', () => {
      const context: PageContext = {
        id: '1234',
        type: PageType.PRODUCT_PAGE
      };

      const action = new fromActions.LoadPageData(context);

      page.seen = new Array<string>();
      page.seen.push(context.id);
      const pageKey = context.id + '_' + context.type;
      const payload = { key: pageKey, value: page };

      const completion1 = new fromActions.LoadPageDataSuccess(payload);
      const completion2 = new fromActions.GetComponentFromPage(
        cmsComponentData
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.loadPage$).toBeObservable(expected);
    });

    it('should emit actions LoadPageDataSuccess and GetComponentFromPage for non-ContentPage type (default)', () => {
      const context: PageContext = {
        id: '1234',
        type: PageType.PRODUCT_PAGE
      };

      const action = new fromActions.LoadPageData(context);

      cmsPageData.uid = 'productList';
      page.pageId = 'productList';
      page.seen = new Array<string>();
      page.seen.push(context.id);

      const pageKey = page.pageId + '_' + context.type;
      const payload = { key: pageKey, value: page };

      const completion1 = new fromActions.LoadPageDataSuccess(payload);
      const completion2 = new fromActions.GetComponentFromPage(
        cmsComponentData
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.loadPage$).toBeObservable(expected);
    });
  });
});
