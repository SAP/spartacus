import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { CmsComponent } from '../../../model/cms.model';
import { CmsActions } from '../actions/index';
import { StateWithCms } from '../cms-state';
import * as fromReducers from '../reducers/index';
import { CmsSelectors } from '../selectors/index';

describe('Navigation Entry Items Selectors', () => {
  let store: Store<StateWithCms>;

  const mockComponents: CmsComponent[] = [
    { uid: 'comp1', typeCode: 'SimpleBannerComponent1' },
    { uid: 'comp2', typeCode: 'SimpleBannerComponent2' },
  ];

  const mockPayload = { nodeId: 'testId', components: mockComponents };

  const mockResult = {
    comp1_AbstractCMSComponent: {
      uid: 'comp1',
      typeCode: 'SimpleBannerComponent1',
    },
    comp2_AbstractCMSComponent: {
      uid: 'comp2',
      typeCode: 'SimpleBannerComponent2',
    },
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

  describe('getSelectedNavigationEntryItemState', () => {
    it('should return selected node', () => {
      let result;

      store
        .pipe(
          select(CmsSelectors.getSelectedNavigationEntryItemState('testId'))
        )
        .subscribe((value) => (result = value));

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: undefined,
      });

      store.dispatch(new CmsActions.LoadCmsNavigationItemsSuccess(mockPayload));

      expect(result.value).toEqual(mockResult);
    });
  });

  describe('itemsSelectorFactory', () => {
    it('should return components by node uid', () => {
      let result;

      store
        .pipe(select(CmsSelectors.getNavigationEntryItems('testId')))
        .subscribe((value) => (result = value));

      store.dispatch(new CmsActions.LoadCmsNavigationItemsSuccess(mockPayload));

      expect(result).toEqual(mockResult);
    });
  });
});
