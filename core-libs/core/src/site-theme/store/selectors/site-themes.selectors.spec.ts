import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { SiteThemeActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { SiteThemeSelectors } from '../selectors/index';
import { SITE_THEME_FEATURE, StateWithSiteTheme } from '../state';

describe('Themes Selectors', () => {
  let store: Store<StateWithSiteTheme>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(SITE_THEME_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getActiveSiteTheme', () => {
    it('should return the active theme', () => {
      let result: string;

      store
        .pipe(select(SiteThemeSelectors.getActiveSiteTheme))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteThemeActions.SetActiveSiteTheme('light'));

      expect(result).toEqual('light');
    });
  });
});
