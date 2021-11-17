import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { ConfigModule } from '../../../config/config.module';
import { Language } from '../../../model/misc.model';
import { BaseOccModule } from '../../../occ/base-occ.module';
import { SiteAdapter } from '../../connectors/site.adapter';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import * as fromEffects from './languages.effect';

describe('Languages Effects', () => {
  let actions$: Subject<SiteContextActions.LanguagesAction>;
  let connector: SiteConnector;
  let effects: fromEffects.LanguagesEffects;
  let mockState: BehaviorSubject<string>;

  let languages: Language[];

  beforeEach(() => {
    languages = [{ active: true, isocode: 'ja', name: 'Japanese' }];
    actions$ = new Subject();
    mockState = new BehaviorSubject(null);
    const mockStore: Partial<Store<any>> = {
      select: () => mockState,
    };

    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, BaseOccModule],
      providers: [
        fromEffects.LanguagesEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
        { provide: Store, useValue: mockStore },
      ],
    });

    connector = TestBed.inject(SiteConnector);
    effects = TestBed.inject(fromEffects.LanguagesEffects);

    spyOn(connector, 'getLanguages').and.returnValue(of(languages));
  });

  describe('loadLanguages$', () => {
    it('should populate all languages from LoadLanguagesSuccess', () => {
      const results = [];
      effects.loadLanguages$.subscribe((a) => results.push(a));
      actions$.next(new SiteContextActions.LoadLanguages());
      expect(results).toEqual([
        new SiteContextActions.LoadLanguagesSuccess(languages),
      ]);
    });
  });

  describe('activateLanguage$', () => {
    describe('when language is set for the first time', () => {
      it('should NOT dispatch language change action', () => {
        const results = [];
        effects.activateLanguage$.subscribe((a) => results.push(a));
        mockState.next('zh');
        expect(results).toEqual([]);
      });
    });

    describe('when language is set for the next time', () => {
      it('should dispatch language change action', () => {
        const results = [];
        effects.activateLanguage$.subscribe((a) => results.push(a));

        mockState.next('en');
        mockState.next('zh');

        const changeAction = new SiteContextActions.LanguageChange({
          previous: 'en',
          current: 'zh',
        });
        expect(results).toEqual([changeAction]);
      });
    });
  });
});
