import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { hot, cold } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, Observable } from 'rxjs';

import { OccSiteService } from '../../occ/index';
import * as fromEffects from './languages.effect';
import * as fromActions from '../actions/languages.action';
import { OccModule } from '../../../occ/occ.module';
import { ConfigModule } from '../../../config/config.module';
import { Language } from '../../../occ/occ-models/occ.models';

describe('Languages Effects', () => {
  let actions$: Observable<any>;
  let service: OccSiteService;
  let effects: fromEffects.LanguagesEffects;

  const languages: Language[] = [
    { active: true, isocode: 'ja', name: 'Japanese' }
  ];

  const data = { languages };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, OccModule],
      providers: [
        OccSiteService,
        fromEffects.LanguagesEffects,
        provideMockActions(() => actions$)
      ]
    });

    service = TestBed.get(OccSiteService);
    effects = TestBed.get(fromEffects.LanguagesEffects);

    spyOn(service, 'loadLanguages').and.returnValue(of(data));
  });

  describe('loadLanguages$', () => {
    it('should populate all languages from LoadLanguagesSuccess', () => {
      const action = new fromActions.LoadLanguages();
      const completion = new fromActions.LoadLanguagesSuccess(data.languages);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadLanguages$).toBeObservable(expected);
    });
  });

  describe('activateLanguage$', () => {
    it('should change the active language', () => {
      const action = new fromActions.SetActiveLanguage('zh');
      const completion = new fromActions.LanguageChange();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.activateLanguage$).toBeObservable(expected);
    });
  });
});
