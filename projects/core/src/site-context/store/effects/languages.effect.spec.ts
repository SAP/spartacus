import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfigModule } from '../../../config/config.module';
import { Language } from '../../../model/misc.model';
import { OccModule } from '../../../occ/occ.module';
import { SiteAdapter } from '../../connectors/site.adapter';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import * as fromEffects from './languages.effect';

describe('Languages Effects', () => {
  let actions$: Observable<SiteContextActions.LanguagesAction>;
  let connector: SiteConnector;
  let effects: fromEffects.LanguagesEffects;

  const languages: Language[] = [
    { active: true, isocode: 'ja', name: 'Japanese' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, OccModule],
      providers: [
        fromEffects.LanguagesEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    connector = TestBed.inject(SiteConnector);
    effects = TestBed.inject(fromEffects.LanguagesEffects);

    spyOn(connector, 'getLanguages').and.returnValue(of(languages));
  });

  describe('loadLanguages$', () => {
    it('should populate all languages from LoadLanguagesSuccess', () => {
      const action = new SiteContextActions.LoadLanguages();
      const completion = new SiteContextActions.LoadLanguagesSuccess(languages);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadLanguages$).toBeObservable(expected);
    });
  });

  describe('activateLanguage$', () => {
    it('should change the active language', () => {
      const action = new SiteContextActions.SetActiveLanguage('zh');
      const completion = new SiteContextActions.LanguageChange();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.activateLanguage$).toBeObservable(expected);
    });
  });
});
