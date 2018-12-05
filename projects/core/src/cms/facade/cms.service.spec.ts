import { TestBed, inject } from '@angular/core/testing';
import { CmsService } from './cms.service';
import { Store, StoreModule } from '@ngrx/store';
import createSpy = jasmine.createSpy;
import * as fromStore from '../store';
import * as ngrxStore from '@ngrx/store';
import * as fromActions from '../store/actions/page.action';
import * as fromReducers from '../store/reducers';

import { of } from 'rxjs';
import { Page } from '../model/page.model';
import { DefaultPageService } from '../occ/default-page.service';
import { CmsModuleConfig } from '../model/cms-config';
import { PageType } from '../../occ-models/occ.models';

const MockCmsModuleConfig: CmsModuleConfig = {
  defaultPageIdForType: {
    ProductPage: ['testProductPage']
  }
};

const mockContentSlot: { uid: string; typeCode: string }[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' }
];

describe('CmsService', () => {
  let store;

  const page: Page = {
    pageId: 'testPageId',
    name: 'testPage',
    seen: [],
    slots: {}
  };

  const payload = { key: 'testPageId_ContentPage', value: page };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromReducers.getReducers())
      ],
      providers: [
        CmsService,
        DefaultPageService,
        { provide: CmsModuleConfig, useValue: MockCmsModuleConfig }
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', inject([CmsService], (service: CmsService) => {
    expect(service).toBeTruthy();
  }));

  it('getComponentData should call the store and trigger component load', inject(
    [CmsService],
    (service: CmsService) => {
      const testUid = 'test_uid';
      const mockSelect = createSpy('select').and.returnValue(() =>
        of(undefined)
      );
      spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

      service.getComponentData(testUid).subscribe(() => {});

      expect(mockSelect).toHaveBeenCalled();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.LoadComponent(testUid)
      );
    }
  ));

  it('getContentSlot should be able to get content slot by position', inject(
    [CmsService],
    (service: CmsService) => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(mockContentSlot)
      );
      let contentSlotReturned: any;
      service.getContentSlot('Section1').subscribe(value => {
        contentSlotReturned = value;
      });
      expect(contentSlotReturned).toBe(mockContentSlot);
    }
  ));

  it('getNavigationEntryItems should be able to get navigation entry items by navigationNodeUid', inject(
    [CmsService],
    (service: CmsService) => {
      const testUid = 'test_uid';
      const mockSelect = createSpy('select').and.returnValue(() =>
        of('test navigation item data')
      );
      spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

      let itemData;
      service
        .getNavigationEntryItems(testUid)
        .subscribe(value => (itemData = value));
      expect(itemData).toEqual('test navigation item data');
    }
  ));

  it('loadNavigationItems should be able to dispatch load navigation items action', inject(
    [CmsService],
    (service: CmsService) => {
      service.loadNavigationItems('rootId', []);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.LoadNavigationItems({
          nodeId: 'rootId',
          items: []
        })
      );
    }
  ));

  it('should expose the latest page property', inject(
    [CmsService],
    (service: CmsService) => {
      store.dispatch(new fromActions.LoadPageDataSuccess(payload));

      let result;
      const subscription = service.currentPage$.subscribe(value => {
        result = value;
      });
      subscription.unsubscribe();

      expect(result).toEqual(page);
    }
  ));

  describe('hasPage()', () => {
    it('should return true when find the cms page by key id_type', inject(
      [CmsService],
      (service: CmsService) => {
        store.dispatch(new fromActions.LoadPageDataSuccess(payload));

        let result = false;
        service
          .hasPage({ id: 'testPageId', type: PageType.CONTENT_PAGE })
          .subscribe(value => {
            result = value;
          });
        expect(result).toBe(true);

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromActions.UpdateLatestPageKey('testPageId_ContentPage')
        );
      }
    ));

    it('should return true when find the cms page in the seen list of the default page', inject(
      [CmsService],
      (service: CmsService) => {
        page.seen.push('123');

        store.dispatch(
          new fromActions.LoadPageDataSuccess({
            key: 'testProductPage_ProductPage',
            value: page
          })
        );

        let result = false;
        service
          .hasPage({ id: '123', type: PageType.PRODUCT_PAGE })
          .subscribe(value => {
            result = value;
          });
        expect(result).toBe(true);

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromActions.UpdateLatestPageKey('testProductPage_ProductPage')
        );
      }
    ));

    it('should return true when find the cms page after loading', inject(
      [CmsService],
      (service: CmsService) => {
        let result: boolean;
        service
          .hasPage({ id: 'newPageId', type: PageType.CONTENT_PAGE })
          .subscribe(value => (result = value));
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
      }
    ));

    it('should return false if loading cms page data error', inject(
      [CmsService],
      (service: CmsService) => {
        let result: boolean;

        service
          .hasPage({ id: 'newPageId', type: PageType.CONTENT_PAGE })
          .subscribe(value => (result = value));

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
      }
    ));

    it('should return false if cannot find the page after loading cms data >=3 times', inject(
      [CmsService],
      (service: CmsService) => {
        let result: boolean;
        service
          .hasPage({ id: 'newPageId', type: PageType.CONTENT_PAGE })
          .subscribe(value => (result = value));

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
      }
    ));
  });
});
