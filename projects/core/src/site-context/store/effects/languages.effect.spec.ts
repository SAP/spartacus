import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfigModule } from '../../../config/config.module';
import { Language } from '../../../model/misc.model';
import { OccModule } from '../../../occ/occ.module';
import { WindowRef } from '../../../window';
import { SiteAdapter } from '../../connectors/site.adapter';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import * as fromEffects from './languages.effect';

describe('Languages Effects', () => {
  let actions$: Subject<SiteContextActions.LanguagesAction>;
  let winRef: WindowRef;
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
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, OccModule],
      providers: [
        fromEffects.LanguagesEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
        { provide: Store, useValue: mockStore },
        {
          provide: WindowRef,
          useValue: {
            sessionStorage: {
              setItem: jasmine.createSpy('sessionStorage.setItem'),
            },
          },
        },
      ],
    });

    connector = TestBed.inject(SiteConnector);
    effects = TestBed.inject(fromEffects.LanguagesEffects);
    winRef = TestBed.inject(WindowRef);

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

  describe('persist$', () => {
    describe('when new value is set for active currency', () => {
      it('should persist it in the session storage', () => {
        effects.persist$.pipe(take(1)).subscribe();
        actions$.next(new SiteContextActions.SetActiveLanguage('en'));

        expect(winRef.sessionStorage.setItem).toHaveBeenCalledWith(
          'language',
          'en'
        );
      });
    });
  });
});
