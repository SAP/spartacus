import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing/models/page-context.model';
import { StateUtils } from '../../../state/utils';
import { ContentSlotComponentData } from '../../model/content-slot-component-data.model';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';
import { CmsActions } from '../actions/index';
import { IndexType, StateWithCms } from '../cms-state';
import * as fromReducers from '../reducers/index';
import { CmsSelectors } from '../selectors/index';

describe('Cms PageData Selectors', () => {
  let store: Store<StateWithCms>;

  const components: ContentSlotComponentData[] = [
    {
      uid: 'comp1',
      flexType: 'SimpleBannerComponent',
    },
    {
      uid: 'comp2',
      flexType: 'CMSLinkComponent',
    },
    {
      uid: 'comp3',
      flexType: 'NavigationComponent',
    },
  ];
  const page: Page = {
    pageId: 'homepage',
    name: 'HomePage',
    slots: { left: { components } },
  };

  const pageContext: PageContext = {
    id: 'homepage',
    type: PageType.CONTENT_PAGE,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromReducers.getReducers()),
      ],
    });
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getPageStateIndex', () => {
    it('should return the index part of the state', () => {
      store.dispatch(new CmsActions.LoadCmsPageDataSuccess(pageContext, page));

      let result: IndexType;
      store
        .pipe(select(CmsSelectors.getPageStateIndex))
        .subscribe((value) => (result = value))
        .unsubscribe();

      const expectedResult: IndexType = {
        content: {
          entities: {
            homepage: {
              loading: false,
              error: false,
              success: true,
              value: page.pageId,
            },
          },
        },
        product: { entities: {} },
        category: { entities: {} },
        catalog: { entities: {} },
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPageStateIndexEntityLoaderState', () => {
    it('should return an index', () => {
      store.dispatch(new CmsActions.LoadCmsPageDataSuccess(pageContext, page));

      let result: StateUtils.EntityLoaderState<string>;
      store
        .pipe(
          select(CmsSelectors.getPageStateIndexEntityLoaderState(pageContext))
        )
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        entities: {
          homepage: {
            loading: false,
            error: false,
            success: true,
            value: page.pageId,
          },
        },
      });
    });
  });

  describe('getPageStateIndexLoaderState', () => {
    it('should return an initial entity state when there is no entity', () => {
      let result: StateUtils.LoaderState<string>;
      store
        .pipe(select(CmsSelectors.getPageStateIndexLoaderState(pageContext)))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: undefined,
      });
    });

    it('should return an entity from an index', () => {
      store.dispatch(new CmsActions.LoadCmsPageDataSuccess(pageContext, page));

      let result: StateUtils.LoaderState<string>;
      store
        .pipe(select(CmsSelectors.getPageStateIndexLoaderState(pageContext)))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: true,
        value: page.pageId,
      });
    });
  });

  describe('getPageStateIndexValue', () => {
    it('should return index value', () => {
      store.dispatch(new CmsActions.LoadCmsPageDataSuccess(pageContext, page));

      let result: string;
      store
        .pipe(select(CmsSelectors.getPageStateIndexValue(pageContext)))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual('homepage');
    });
  });

  describe('getPageEntities', () => {
    it('should return the entities', () => {
      store.dispatch(new CmsActions.LoadCmsPageDataSuccess(pageContext, page));

      let result: { [id: string]: Page };
      store
        .pipe(select(CmsSelectors.getPageEntities))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({ homepage: page });
    });
  });

  describe('getPageData', () => {
    it('should return the page', () => {
      store.dispatch(new CmsActions.LoadCmsPageDataSuccess(pageContext, page));

      let result: Page;
      store
        .pipe(select(CmsSelectors.getPageData(pageContext)))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(page);
    });
  });

  describe('getPageComponentTypes', () => {
    it('should return components', () => {
      store.dispatch(new CmsActions.LoadCmsPageDataSuccess(pageContext, page));

      let result: string[];
      store
        .pipe(select(CmsSelectors.getPageComponentTypes(pageContext)))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual([
        'SimpleBannerComponent',
        'CMSLinkComponent',
        'NavigationComponent',
      ]);
    });
  });

  describe('getCurrentSlotSelectorFactory', () => {
    it('should return current slot by position', () => {
      store.dispatch(new CmsActions.LoadCmsPageDataSuccess(pageContext, page));

      let result: ContentSlotData;
      store
        .pipe(
          select(
            CmsSelectors.getCurrentSlotSelectorFactory(pageContext, 'left')
          )
        )
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({ components });
    });
  });
});
