import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';

import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from '../selectors/index';
import { CmsComponent } from '../../../occ/occ-models/index';
import { StateWithCms } from '../cms-state';

describe('Navigation Entry Items Selectors', () => {
  let store: Store<StateWithCms>;

  const mockComponents: CmsComponent[] = [
    { uid: 'comp1', typeCode: 'SimpleBannerComponent1' },
    { uid: 'comp2', typeCode: 'SimpleBannerComponent2' }
  ];

  const mockPayload = { nodeId: 'testId', components: mockComponents };

  const mockResult = {
    comp1_AbstractCMSComponent: {
      uid: 'comp1',
      typeCode: 'SimpleBannerComponent1'
    },
    comp2_AbstractCMSComponent: {
      uid: 'comp2',
      typeCode: 'SimpleBannerComponent2'
    }
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

  describe('getSelectedNavigationEntryItemState', () => {
    it('should return selected node', () => {
      let result;

      store
        .pipe(
          select(fromSelectors.getSelectedNavigationEntryItemState('testId'))
        )
        .subscribe(value => (result = value));

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: undefined
      });

      store.dispatch(new fromActions.LoadNavigationItemsSuccess(mockPayload));

      expect(result.value).toEqual(mockResult);
    });
  });

  describe('itemsSelectorFactory', () => {
    it('should return components by node uid', () => {
      let result;

      store
        .pipe(select(fromSelectors.itemsSelectorFactory('testId')))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadNavigationItemsSuccess(mockPayload));

      expect(result).toEqual(mockResult);
    });
  });
});
