import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';
import { CmsComponent } from '../../../occ-models/index';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from '../selectors/component.selectors';
import { StateWithCms } from '../cms-state';

describe('Cms Component Selectors', () => {
  let store: Store<StateWithCms>;

  const component: CmsComponent = {
    uid: 'comp1',
    typeCode: 'SimpleBannerComponent'
  };
  const entities = {
    comp1: component
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

  describe('getComponentEntities', () => {
    it('should return components as entities', () => {
      let result;

      store
        .pipe(select(fromSelectors.getComponentEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadComponentSuccess(component));

      expect(result).toEqual(entities);
    });
  });

  describe('componentSelectorFactory', () => {
    it('should return component by uid', () => {
      let result;

      store
        .pipe(select(fromSelectors.componentSelectorFactory('comp1')))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadComponentSuccess(component));

      expect(result).toEqual(entities['comp1']);
    });
  });
});
