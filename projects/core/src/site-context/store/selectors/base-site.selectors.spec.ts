import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { SiteContextSelectors } from '../selectors/index';
import { SITE_CONTEXT_FEATURE, StateWithSiteContext } from '../state';

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

    store = TestBed.inject(Store);
  });

  describe('getActiveBaseSite', () => {
    it('should return baseSite', () => {
      let result: string;

      store
        .pipe(select(SiteContextSelectors.getActiveBaseSiteUid))
        .subscribe((value) => (result = value));

      expect(result).toEqual('');

      store.dispatch(new SiteContextActions.SetActiveBaseSite('baseSite'));
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
        .pipe(select(SiteContextSelectors.getBaseSiteData))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(new SiteContextActions.LoadBaseSiteSuccess(site));
      expect(result).toEqual(site);
    });
  });
});
