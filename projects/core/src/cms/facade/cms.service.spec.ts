import { TestBed, inject } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';

import { of, Observable } from 'rxjs';

import createSpy = jasmine.createSpy;

import { take } from 'rxjs/operators';

import * as fromStore from '../store';
import { ContentSlotData } from '../model/content-slot-data.model';
import { Page } from '../model/page.model';
import * as fromActions from '../store/actions';
import * as fromReducers from '../store/reducers';
import { PageType } from '../../occ/occ-models/occ.models';

import { CmsService } from './cms.service';
import { RoutingService, PageContext } from '../../routing';
import { StateWithCms } from '../store/cms-state';
import { NodeItem } from '../model/node-item.model';
import { LoaderState } from '../../state';

class MockRoutingService {
  getPageContext(): Observable<PageContext> {
    return of();
  }
}

const mockContentSlot: ContentSlotData = {
  components: [
    { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
    { uid: 'comp2', typeCode: 'CMSLinkComponent' },
    { uid: 'comp3', typeCode: 'NavigationComponent' }
  ]
};

describe('CmsService', () => {
  let store: Store<StateWithCms>;
  let routingService: RoutingService;

  const page: Page = {
    pageId: 'homepage',
    name: 'testPage',
    slots: {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromReducers.getReducers())
      ],
      providers: [
        CmsService,
        { provide: RoutingService, useClass: MockRoutingService }
      ]
    });

    store = TestBed.get(Store);
    routingService = TestBed.get(RoutingService);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', inject([CmsService], (service: CmsService) => {
    expect(service).toBeTruthy();
  }));

  it('getComponentData should call the store and trigger component load', inject(
    [CmsService],
    (service: CmsService) => {
      spyOn(service, 'getCurrentPage').and.returnValue(of(page));

      const testUid = 'test_uid';
      const mockSelect = createSpy('select').and.returnValue(() => of({}));
      spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

      service
        .getComponentData(testUid)
        .pipe(take(1))
        .subscribe(() => {})
        .unsubscribe();

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
      spyOn(routingService, 'getPageContext').and.returnValue(
        of({ id: 'test' })
      );

      let contentSlotReturned: ContentSlotData;
      service
        .getContentSlot('Section1')
        .subscribe(value => {
          contentSlotReturned = value;
        })
        .unsubscribe();

      expect(contentSlotReturned).toBe(mockContentSlot);
    }
  ));

  fit('getNavigationEntryItems should be able to get navigation entry items by navigationNodeUid', inject(
    [CmsService],
    (service: CmsService) => {
      const testUid = 'test_uid';
      const mockNodeItem: NodeItem = {
        testUid: 'test'
      };
      const mockSelect = createSpy('select').and.returnValue(() =>
        of(mockNodeItem)
      );
      spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

      let result: NodeItem;
      service
        .getNavigationEntryItems(testUid)
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(mockNodeItem);
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

  it('getCurrentPage should expose the current page', inject(
    [CmsService],
    (service: CmsService) => {
      const pageContext: PageContext = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE
      };
      spyOn(routingService, 'getPageContext').and.returnValue(of(pageContext));

      store.dispatch(
        new fromActions.LoadPageIndexSuccess(pageContext, page.pageId)
      );
      store.dispatch(new fromActions.LoadPageDataSuccess(page));

      let result: Page;
      service
        .getCurrentPage()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result).toEqual(page);
    }
  ));

  it('should be able to refresh the latest cms page', inject(
    [CmsService],
    (service: CmsService) => {
      const pageContext: PageContext = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE
      };
      spyOn(routingService, 'getPageContext').and.returnValue(of(pageContext));

      service.refreshLatestPage();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromActions.LoadPageIndex(pageContext)
      );
    }
  ));

  it('should be able to refresh the cms component by uid', inject(
    [CmsService],
    (service: CmsService) => {
      service.refreshComponent('test_uid');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromActions.LoadComponent('test_uid')
      );
    }
  ));

  describe('hasPage()', () => {
    it('should dispatch a load action if the load was not attempted', inject(
      [CmsService],
      (service: CmsService) => {
        const mockedEntity: LoaderState<string> = {};
        const mockSelect = createSpy('select').and.returnValue(() =>
          of(mockedEntity)
        );
        spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

        const pageContext: PageContext = {
          type: PageType.CONTENT_PAGE,
          id: 'homepage'
        };

        service
          .hasPage(pageContext)
          .subscribe(_ => _)
          .unsubscribe();

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromActions.LoadPageIndex(pageContext)
        );
      }
    ));

    it('should NOT dispatch a load action if the load was attempted', inject(
      [CmsService],
      (service: CmsService) => {
        const mockedEntity: LoaderState<string> = { success: true };
        const mockSelect = createSpy('select').and.returnValue(() =>
          of(mockedEntity)
        );
        spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

        const pageContext: PageContext = {
          type: PageType.CONTENT_PAGE,
          id: 'homepage'
        };

        service
          .hasPage(pageContext)
          .subscribe(_ => _)
          .unsubscribe();

        expect(store.dispatch).not.toHaveBeenCalledWith(
          new fromActions.LoadPageIndex(pageContext)
        );
      }
    ));

    it('should return true if the load was successful', inject(
      [CmsService],
      (service: CmsService) => {
        const mockedEntity: LoaderState<string> = { success: true };
        const mockSelect = createSpy('select').and.returnValue(() =>
          of(mockedEntity)
        );
        spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

        const pageContext: PageContext = {
          type: PageType.CONTENT_PAGE,
          id: 'homepage'
        };

        let result: boolean;
        service
          .hasPage(pageContext)
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toEqual(true);
      }
    ));

    it('should return false if the there was an error', inject(
      [CmsService],
      (service: CmsService) => {
        const mockedEntity: LoaderState<string> = {
          success: false,
          error: true
        };
        const mockSelect = createSpy('select').and.returnValue(() =>
          of(mockedEntity)
        );
        spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

        const pageContext: PageContext = {
          type: PageType.CONTENT_PAGE,
          id: 'homepage'
        };

        let result: boolean;
        service
          .hasPage(pageContext)
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toEqual(false);
      }
    ));
  });
});
