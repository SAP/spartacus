import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { CmsComponent } from '../../../model/cms.model';
import { CmsActions } from '../actions/index';
import { StateWithCms } from '../cms-state';
import * as fromReducers from '../reducers/index';
import { CmsSelectors } from '../selectors/index';

describe('Cms Component Selectors', () => {
  let store: Store<StateWithCms>;

  const component: CmsComponent = {
    uid: 'comp1',
    typeCode: 'SimpleBannerComponent',
  };
  const entities = {
    comp1: component,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromReducers.getReducers()),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getComponentEntities', () => {
    it('should return components as entities', () => {
      let result;

      store
        .pipe(select(CmsSelectors.getComponentEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new CmsActions.LoadCmsComponentSuccess(component));

      expect(result).toEqual(entities);
    });
  });

  describe('componentSelectorFactory', () => {
    it('should return component by uid', () => {
      let result: CmsComponent;

      store
        .pipe(select(CmsSelectors.componentSelectorFactory('comp1')))
        .subscribe(value => (result = value));

      store.dispatch(new CmsActions.LoadCmsComponentSuccess(component));

      expect(result).toEqual(entities['comp1']);
    });
  });
});
