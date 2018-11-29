import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/page.selectors';

import { Page } from '../../models/page.model';
import { CmsComponent } from '@spartacus/core';

describe('Cms PageData Selectors', () => {
  let store: Store<fromReducers.CmsState>;

  const components: CmsComponent[] = [
    { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
    { uid: 'comp2', typeCode: 'CMSLinkComponent' },
    { uid: 'comp3', typeCode: 'NavigationComponent' }
  ];
  const page: Page = {
    pageId: 'testPageId',
    name: 'testPage',
    seen: [],
    slots: { left: components }
  };
  const payload = { key: 'test', value: page };

  const entities = {
    test: page
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

  describe('getPageEntities', () => {
    it('should return pages as entities', () => {
      let result;

      store
        .pipe(select(fromSelectors.getPageEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadPageDataSuccess(payload));

      expect(result).toEqual(entities);
    });
  });

  describe('getLatestPageKey', () => {
    it('should return the latest page key', () => {
      let result;

      store
        .pipe(select(fromSelectors.getLatestPageKey))
        .subscribe(value => (result = value));

      expect(result).toEqual('');

      store.dispatch(new fromActions.UpdateLatestPageKey(payload.key));

      expect(result).toEqual('test');
    });
  });

  describe('getLatestPage', () => {
    it('should return the latest page', () => {
      let result;

      store
        .pipe(select(fromSelectors.getLatestPage))
        .subscribe(value => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new fromActions.LoadPageDataSuccess(payload));
      store.dispatch(new fromActions.UpdateLatestPageKey(payload.key));

      expect(result).toEqual(payload.value);
    });
  });

  describe('currentSlotSelectorFactory', () => {
    it('should return current slot by position', () => {
      let result;

      store
        .pipe(select(fromSelectors.currentSlotSelectorFactory('left')))
        .subscribe(value => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new fromActions.LoadPageDataSuccess(payload));
      store.dispatch(new fromActions.UpdateLatestPageKey(payload.key));

      expect(result).toEqual(components);
    });
  });
});
