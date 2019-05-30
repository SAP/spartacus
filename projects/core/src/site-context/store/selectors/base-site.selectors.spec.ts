import { TestBed } from '@angular/core/testing';
import { Store, select, StoreModule } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors/base-site.selectors';
import { StateWithSiteContext, SITE_CONTEXT_FEATURE } from '../state';
import { BaseSite } from '../../../model/misc.model';

describe('BaseSite Selectors', () => {
  let store: Store<StateWithSiteContext>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          SITE_CONTEXT_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });
    store = TestBed.get(Store);
  });

  describe('getActiveBaseSite', () => {
    it('should return baseSite', () => {
      let result: string;

      store
        .pipe(select(fromSelectors.getActiveBaseSite))
        .subscribe(value => (result = value));

      expect(result).toEqual('');

      store.dispatch(new fromActions.SetActiveBaseSite('baseSite'));
      expect(result).toEqual('baseSite');
    });
  });

  describe('getBaseSiteData', () => {
    it('should return base site details data', () => {
      const site: BaseSite = {
        uid: 'test',
        defaultPreviewCategoryCode: 'test category code',
        defaultPreviewProductCode: 'test product code',
      };

      let result: BaseSite;
      store
        .pipe(select(fromSelectors.getBaseSiteData))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadBaseSiteSuccess(site));
      expect(result).toEqual(site);
    });
  });
});
