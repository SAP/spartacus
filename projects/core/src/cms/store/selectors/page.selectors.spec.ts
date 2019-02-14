import { TestBed } from '@angular/core/testing';

import { StoreModule, Store, select } from '@ngrx/store';

import { StateWithCms, IndexType } from '../cms-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/page.selectors';
import {
  EntitySuccessAction,
  EntityLoaderState,
  LoaderState
} from '../../../state';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';
import { CmsComponent, PageType } from '../../../occ/occ-models/index';
import { PageContext } from 'projects/core/src/routing';

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

  describe('getPageStateIndex', () => {
    it('should return the index part of the state', () => {
      store.dispatch(
        new EntitySuccessAction(PageType.CONTENT_PAGE, 'homepage', 'value')
      );

      let result: IndexType;
      store
        .pipe(select(fromSelectors.getPageStateIndex))
        .subscribe(value => (result = value))
        .unsubscribe();

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

  describe('getIndex', () => {
    it('should return an index', () => {
      store.dispatch(
        new EntitySuccessAction(PageType.CONTENT_PAGE, 'homepage', 'value')
      );

      const pageContext: PageContext = {
        id: 'testPageId',
        type: PageType.CONTENT_PAGE
      };

      let result: EntityLoaderState<string>;
      store
        .pipe(select(fromSelectors.getIndex(pageContext)))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        entities: {
          homepage: {
            loading: false,
            error: false,
            success: true,
            value: 'value'
          }
        }
      });
    });
  });

  fdescribe('getIndexEntity', () => {
    const pageContext: PageContext = {
      id: 'testPageId',
      type: PageType.CONTENT_PAGE
    };

    it('should retrn an empty object when there is no entity', () => {
      let result: LoaderState<string>;
      store
        .pipe(select(fromSelectors.getIndexEntity(pageContext)))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({});
    });

    it('should return an entity from an index', () => {
      store.dispatch(
        new EntitySuccessAction(PageType.CONTENT_PAGE, 'homepage', 'value')
      );

      let result: LoaderState<string>;
      store
        .pipe(select(fromSelectors.getIndexEntity(pageContext)))
        .subscribe(value => (result = value))
        .unsubscribe();

      console.log(result);
      expect(result).toEqual({
        loading: false,
        error: false,
        success: true,
        value: 'value'
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
