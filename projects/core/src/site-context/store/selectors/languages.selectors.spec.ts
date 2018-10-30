import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/languages.selectors';
import { StateWithSiteContext } from '../state';
import { SiteContextModule } from '../../site-context.module';

describe('Languages Selectors', () => {
  let store: Store<StateWithSiteContext>;

  const languages: any[] = [{ active: true, isocode: 'ja', name: 'Japanese' }];

  const entities = {
    ja: languages[0]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteContextModule
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getLanguagesEntities', () => {
    it('should return Languages entities', () => {
      let result;

      store
        .pipe(select(fromSelectors.getLanguagesEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadLanguagesSuccess(languages));

      expect(result).toEqual(entities);
    });
  });

  describe('getActiveLanguage', () => {
    it('should return the active language', () => {
      let result;

      store
        .pipe(select(fromSelectors.getActiveLanguage))
        .subscribe(value => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new fromActions.SetActiveLanguage('zh'));

      expect(result).toEqual('zh');
    });
  });

  describe('getAllLanguages', () => {
    it('should return all languages', () => {
      let result;

      store
        .pipe(select(fromSelectors.getAllLanguages))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadLanguagesSuccess(languages));

      expect(result).toEqual(languages);
    });
  });
});
