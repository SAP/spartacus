import { TestBed } from '@angular/core/testing';

import { StoreModule, Store, select } from '@ngrx/store';

import { StateWithCms, IndexType } from '../cms-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/page.selectors';
import { EntitySuccessAction } from '../../../state';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';
import { CmsComponent, PageType } from '../../../occ/occ-models/index';

fdescribe('Cms PageData Selectors', () => {
  let store: Store<StateWithCms>;

  const components: CmsComponent[] = [
    { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
    { uid: 'comp2', typeCode: 'CMSLinkComponent' },
    { uid: 'comp3', typeCode: 'NavigationComponent' }
  ];
  const page: Page = {
    pageId: 'testPageId',
    name: 'testPage',
    slots: { left: { components } }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromReducers.getReducers())
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  fdescribe('getPageStateIndex', () => {
    it('should return the index part of the state', () => {
      let result: IndexType;

      store
        .pipe(select(fromSelectors.getPageStateIndex))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new EntitySuccessAction(PageType.CONTENT_PAGE, 'homepage', 'value')
      );

      const expectedResult: IndexType = {
        content: {
          entities: {
            homepage: {
              loading: false,
              error: false,
              success: true,
              value: 'value'
            }
          }
        },
        product: { entities: {} },
        category: { entities: {} },
        catalog: { entities: {} }
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPageEntities', () => {
    it('should return pages as entities', () => {
      let result: { [key: string]: Page };

      store
        .pipe(select(fromSelectors.getPageEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadPageDataSuccess(page));

      expect(result).toEqual({
        [page.pageId]: page
      });
    });
  });

  describe('getLatestPageId', () => {
    it('should return the latest page id', () => {
      let result: string;

      store
        .pipe(select(fromSelectors.getLatestPageId))
        .subscribe(value => (result = value));

      expect(result).toEqual('');

      store.dispatch(new fromActions.UpdateLatestPageId('test'));

      expect(result).toEqual('test');
    });
  });

  describe('getLatestPage', () => {
    it('should return the latest page', () => {
      let result: Page;

      store
        .pipe(select(fromSelectors.getLatestPage))
        .subscribe(value => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new fromActions.LoadPageDataSuccess(page));
      store.dispatch(new fromActions.UpdateLatestPageId(page.pageId));

      expect(result).toEqual(page);
    });
  });

  describe('currentSlotSelectorFactory', () => {
    it('should return current slot by position', () => {
      let result: ContentSlotData;

      store
        .pipe(select(fromSelectors.currentSlotSelectorFactory('left')))
        .subscribe(value => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new fromActions.LoadPageDataSuccess(page));
      store.dispatch(new fromActions.UpdateLatestPageId(page.pageId));

      expect(result).toEqual({ components });
    });
  });
});
