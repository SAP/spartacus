import { vi } from 'vitest';
import { PLATFORM_ID } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
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
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideMockFeatureToggles } from '../../../../src/features-config/feature-toggles/testing';

describe('Languages Effects', () => {
  let actions$: Subject<SiteContextActions.LanguagesAction>;
  let connector: SiteConnector;
  let effects: fromEffects.LanguagesEffects;
  let mockState: BehaviorSubject<string | null>;

  let languages: Language[];

  function configureTestBed(
    reloadOnLanguageChange: boolean,
    platformId: string = 'browser'
  ) {
    languages = [{ active: true, isocode: 'ja', name: 'Japanese' }];
    actions$ = new Subject();
    mockState = new BehaviorSubject<string | null>(null);
    const mockStore: Partial<Store<any>> = {
      select: () => mockState,
    };

    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), BaseOccModule],
      providers: [
        fromEffects.LanguagesEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
        { provide: Store, useValue: mockStore },
        { provide: PLATFORM_ID, useValue: platformId },
        provideMockFeatureToggles({ reloadOnLanguageChange }),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    connector = TestBed.inject(SiteConnector);
    effects = TestBed.inject(fromEffects.LanguagesEffects);

    vi.spyOn(connector, 'getLanguages').mockReturnValue(of(languages));
  }

  describe('loadLanguages$', () => {
    beforeEach(() => configureTestBed(false));

    it('should populate all languages from LoadLanguagesSuccess', () => {
      const results: SiteContextActions.LanguagesAction[] = [];
      effects.loadLanguages$.subscribe((a) => results.push(a));
      actions$.next(new SiteContextActions.LoadLanguages());
      expect(results).toEqual([
        new SiteContextActions.LoadLanguagesSuccess(languages),
      ]);
    });
  });

  describe('activateLanguage$', () => {
    beforeEach(() => configureTestBed(false));

    describe('when language is set for the first time', () => {
      it('should NOT dispatch language change action', () => {
        const results: SiteContextActions.LanguageChange[] = [];
        effects.activateLanguage$.subscribe((a) => results.push(a));
        mockState.next('zh');
        expect(results).toEqual([]);
      });
    });

    describe('when language is set for the next time', () => {
      it('should dispatch language change action', () => {
        const results: SiteContextActions.LanguageChange[] = [];
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

  describe('reloadPageOnLanguageChange$', () => {
    describe('reloadOnLanguageChange OFF', () => {
      beforeEach(() => configureTestBed(false));

      it('should NOT reload the page when language changes', () => {
        vi.spyOn(effects as any, 'reloadPage');
        effects.reloadPageOnLanguageChange$.subscribe();
        actions$.next(
          new SiteContextActions.LanguageChange({
            previous: 'en',
            current: 'ja',
          })
        );
        expect((effects as any).reloadPage).not.toHaveBeenCalled();
      });
    });

    describe('reloadOnLanguageChange ON', () => {
      describe('in browser', () => {
        beforeEach(() => configureTestBed(true, 'browser'));

        it('should reload the page when language changes', () => {
          vi.spyOn(effects as any, 'reloadPage');
          effects.reloadPageOnLanguageChange$.subscribe();
          actions$.next(
            new SiteContextActions.LanguageChange({
              previous: 'en',
              current: 'ja',
            })
          );
          expect((effects as any).reloadPage).toHaveBeenCalledTimes(1);
        });
      });

      describe('on server (SSR)', () => {
        beforeEach(() => configureTestBed(true, 'server'));

        it('should NOT reload the page', () => {
          vi.spyOn(effects as any, 'reloadPage');
          effects.reloadPageOnLanguageChange$.subscribe();
          actions$.next(
            new SiteContextActions.LanguageChange({
              previous: 'en',
              current: 'ja',
            })
          );
          expect((effects as any).reloadPage).not.toHaveBeenCalled();
        });
      });
    });
  });
});
