import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { SiteTheme } from '../../../model/misc.model';
import { SiteThemeActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { SiteThemeSelectors } from '../selectors/index';
import {
  SiteThemeEntities,
  SITE_THEME_FEATURE,
  StateWithSiteTheme,
} from '../state';

describe('Themes Selectors', () => {
  let store: Store<StateWithSiteTheme>;

  const themes: SiteTheme[] = [
    { i18nNameKey: 'dark', className: 'dark', default: true },
  ];

  const entities = {
    dark: themes[0],
  };

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

  describe('getSiteThemeEntities', () => {
    it('should return Themes entities', () => {
      let result: SiteThemeEntities;

      store
        .pipe(select(SiteThemeSelectors.getSiteThemeEntities))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteThemeActions.LoadSiteThemesSuccess(themes));

      expect(result).toEqual(entities);
    });
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

  describe('getAllThemes', () => {
    it('should return all themes', () => {
      let result: SiteTheme[];

      store
        .pipe(select(SiteThemeSelectors.getAllSiteThemes))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteThemeActions.LoadSiteThemesSuccess(themes));

      expect(result).toEqual(themes);
    });
  });
});
