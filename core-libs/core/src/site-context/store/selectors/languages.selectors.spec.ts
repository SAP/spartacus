import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Language } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { SiteContextSelectors } from '../selectors/index';
import {
  LanguagesEntities,
  SITE_CONTEXT_FEATURE,
  StateWithSiteContext,
} from '../state';

describe('Languages Selectors', () => {
  let store: Store<StateWithSiteContext>;

  const languages: Language[] = [
    { active: true, isocode: 'ja', name: 'Japanese' },
  ];

  const entities = {
    ja: languages[0],
  };

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
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getLanguagesEntities', () => {
    it('should return Languages entities', () => {
      let result: LanguagesEntities;

      store
        .pipe(select(SiteContextSelectors.getLanguagesEntities))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.LoadLanguagesSuccess(languages));

      expect(result).toEqual(entities);
    });
  });

  describe('getActiveLanguage', () => {
    it('should return the active language', () => {
      let result: string;

      store
        .pipe(select(SiteContextSelectors.getActiveLanguage))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.SetActiveLanguage('zh'));

      expect(result).toEqual('zh');
    });
  });

  describe('getAllLanguages', () => {
    it('should return all languages', () => {
      let result: Language[];

      store
        .pipe(select(SiteContextSelectors.getAllLanguages))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.LoadLanguagesSuccess(languages));

      expect(result).toEqual(languages);
    });
  });
});
