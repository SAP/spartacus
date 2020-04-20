import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject, NEVER, Observable, of, Subject } from 'rxjs';
import { ConfigModule } from '../../../config/config.module';
import { Language } from '../../../model/misc.model';
import { OccModule } from '../../../occ/occ.module';
import { SiteAdapter } from '../../connectors/site.adapter';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import * as fromEffects from './languages.effect';
import { LanguagesEffects } from './languages.effect';

describe('Languages Effects', () => {
  describe('loadLanguages$', () => {
    let actions$: Observable<SiteContextActions.LanguagesAction>;
    let connector: SiteConnector;
    let effects: fromEffects.LanguagesEffects;

    let languages: Language[];

    beforeEach(() => {
      languages = [{ active: true, isocode: 'ja', name: 'Japanese' }];

      TestBed.configureTestingModule({
        imports: [ConfigModule.forRoot(), HttpClientTestingModule, OccModule],
        providers: [
          fromEffects.LanguagesEffects,
          { provide: SiteAdapter, useValue: {} },
          provideMockActions(() => actions$),
          { provide: Store, useValue: { select: () => NEVER } },
        ],
      });

      connector = TestBed.inject(SiteConnector);
      effects = TestBed.inject(fromEffects.LanguagesEffects);

      spyOn(connector, 'getLanguages').and.returnValue(of(languages));
    });

    it('should populate all languages from LoadLanguagesSuccess', () => {
      const action = new SiteContextActions.LoadLanguages();
      const completion = new SiteContextActions.LoadLanguagesSuccess(languages);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadLanguages$).toBeObservable(expected);
    });
  });

  describe('activateLanguage$', () => {
    let actions$: Subject<SiteContextActions.LanguagesAction>;
    let mockState: BehaviorSubject<string>;
    let languagesEffects: LanguagesEffects;

    beforeEach(() => {
      actions$ = new Subject();
      mockState = new BehaviorSubject(null);

      const mockStore: Partial<Store<any>> = {
        select: () => mockState,
      };

      TestBed.configureTestingModule({
        imports: [ConfigModule.forRoot(), HttpClientTestingModule, OccModule],
        providers: [
          fromEffects.LanguagesEffects,
          { provide: SiteAdapter, useValue: {} },
          provideMockActions(() => actions$),
          { provide: Store, useValue: mockStore },
        ],
      });

      languagesEffects = TestBed.inject(LanguagesEffects);
    });

    describe('when language is set for the first time', () => {
      it('should NOT dispatch language change action', () => {
        const results = [];
        languagesEffects.activateLanguage$.subscribe(a => results.push(a));

        mockState.next('zh');
        const setActiveAction = new SiteContextActions.SetActiveLanguage('zh');
        actions$.next(setActiveAction);

        expect(results).toEqual([]);
      });
    });

    describe('when language is set for the next time', () => {
      it('should dispatch language change action', () => {
        const results = [];
        languagesEffects.activateLanguage$.subscribe(a => results.push(a));

        mockState.next('en');
        actions$.next(new SiteContextActions.SetActiveLanguage('en'));

        mockState.next('zh');
        actions$.next(new SiteContextActions.SetActiveLanguage('zh'));

        const changeAction = new SiteContextActions.LanguageChange({
          previous: 'en',
          current: 'zh',
        });
        expect(results).toEqual([changeAction]);
      });
    });

    describe('when the same language is set for the next time', () => {
      it('should NOT dispatch language change action', () => {
        const results = [];
        languagesEffects.activateLanguage$.subscribe(a => results.push(a));

        mockState.next('en');
        actions$.next(new SiteContextActions.SetActiveLanguage('en'));

        mockState.next('en');
        actions$.next(new SiteContextActions.SetActiveLanguage('en'));

        expect(results).toEqual([]);
      });
    });
  });
});
