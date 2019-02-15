import { TestBed } from '@angular/core/testing';

import { StoreModule, Store, select } from '@ngrx/store';

import { StateWithCms, IndexType } from '../cms-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/page.selectors';
import { EntityLoaderState, LoaderState } from '../../../state';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';
import { CmsComponent, PageType } from '../../../occ/occ-models/index';
import { PageContext } from 'projects/core/src/routing';

describe('Cms PageData Selectors', () => {
  let store: Store<StateWithCms>;

  const components: CmsComponent[] = [
    { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
    { uid: 'comp2', typeCode: 'CMSLinkComponent' },
    { uid: 'comp3', typeCode: 'NavigationComponent' }
  ];
  const page: Page = {
    pageId: 'homepage',
    name: 'HomePage',
    slots: { left: { components } }
  };

  const pageContext: PageContext = {
    id: 'homepage',
    type: PageType.CONTENT_PAGE
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
        new fromActions.LoadPageIndexSuccess(pageContext, 'value')
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
        new fromActions.LoadPageIndexSuccess(pageContext, 'value')
      );

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

  describe('getIndexEntity', () => {
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
        new fromActions.LoadPageIndexSuccess(pageContext, 'value')
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

  describe('getPageEntities', () => {
    it('should return the entities', () => {
      store.dispatch(new fromActions.LoadPageDataSuccess(page));

      let result: { [id: string]: Page };
      store
        .pipe(select(fromSelectors.getPageEntities))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({ homepage: page });
    });
  });

  describe('getPageData', () => {
    it('should return the page', () => {
      store.dispatch(
        new fromActions.LoadPageIndexSuccess(pageContext, 'homepage')
      );
      store.dispatch(new fromActions.LoadPageDataSuccess(page));

      let result: Page;
      store
        .pipe(select(fromSelectors.getPageData(pageContext)))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(page);
    });
  });

  describe('currentSlotSelectorFactory', () => {
    it('should return current slot by position', () => {
      store.dispatch(
        new fromActions.LoadPageIndexSuccess(pageContext, 'homepage')
      );
      store.dispatch(new fromActions.LoadPageDataSuccess(page));

      let result: ContentSlotData;
      store
        .pipe(
          select(fromSelectors.currentSlotSelectorFactory(pageContext, 'left'))
        )
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({ components });
    });
  });
});
