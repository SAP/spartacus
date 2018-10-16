import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers, select } from '@ngrx/store';

import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/component.selectors';

describe('Cms Component Selectors', () => {
  let store: Store<fromReducers.CmsState>;

  const component = { uid: 'comp1', typeCode: 'SimpleBannerComponent' };
  const entities = {
    comp1: component
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromReducers.getReducers())
        })
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
