import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { ConfigModule } from '../../../config/config.module';
import { Theme } from '../../../model/misc.model';
import { BaseOccModule } from '../../../occ/base-occ.module';
import { SiteThemeActions } from '../actions/index';
import * as fromEffects from './site-themes.effect';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { SiteThemeConfig } from '../../config/site-theme-config';

const themes: Theme[] = [
  { i18nNameKey: 'dark', className: 'dark', default: true },
];
const mockSiteThemeConfig: SiteThemeConfig = {
  siteTheme: {
    themes: themes,
  },
};

describe('Themes Effects', () => {
  let actions$: Subject<SiteThemeActions.SiteThemesAction>;
  let effects: fromEffects.SiteThemesEffects;
  let mockState: BehaviorSubject<string>;
  let baseSiteService: jasmine.SpyObj<BaseSiteService>;

  beforeEach(() => {
    actions$ = new Subject();
    mockState = new BehaviorSubject('');
    const baseSiteServiceSpy = jasmine.createSpyObj('BaseSiteService', ['get']);
    const mockStore: Partial<Store<any>> = {
      select: () => mockState,
    };

    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, BaseOccModule],
      providers: [
        fromEffects.SiteThemesEffects,
        provideMockActions(() => actions$),
        { provide: Store, useValue: mockStore },
        { provide: BaseSiteService, useValue: baseSiteServiceSpy },
        { provide: SiteThemeConfig, useValue: mockSiteThemeConfig },
      ],
    });

    effects = TestBed.inject(fromEffects.SiteThemesEffects);
    baseSiteService = TestBed.inject(
      BaseSiteService
    ) as jasmine.SpyObj<BaseSiteService>;
    baseSiteService.get.and.returnValue(of({ theme: 'dark' }));
  });

  describe('loadThemes$', () => {
    it('should populate all themes from LoadThemesSuccess', () => {
      const results: any[] = [];
      effects.loadThemes$.subscribe((a) => results.push(a));
      actions$.next(new SiteThemeActions.LoadThemes());
      expect(results).toEqual([new SiteThemeActions.LoadThemesSuccess(themes)]);
    });

    it('should replace default theme', () => {
      const mockSiteTheme = 'red';
      baseSiteService.get.and.returnValue(of({ theme: mockSiteTheme }));
      const mockThemes = [
        { ...themes[0], className: mockSiteTheme },
        ...themes.slice(1),
      ];
      const results: any[] = [];
      effects.loadThemes$.subscribe((a) => results.push(a));
      actions$.next(new SiteThemeActions.LoadThemes());

      expect(results).toEqual([
        new SiteThemeActions.LoadThemesSuccess(mockThemes),
      ]);
    });
  });

  describe('activateTheme$', () => {
    describe('when theme is set for the first time', () => {
      it('should NOT dispatch theme change action', () => {
        const results: any[] = [];
        effects.activateTheme$.subscribe((a) => results.push(a));
        mockState.next('light');
        expect(results).toEqual([]);
      });
    });

    describe('when theme is set for the next time', () => {
      it('should dispatch theme change action', () => {
        const results: any[] = [];
        effects.activateTheme$.subscribe((a) => results.push(a));

        mockState.next('dark');
        mockState.next('light');

        const changeAction = new SiteThemeActions.ThemeChange({
          previous: 'dark',
          current: 'light',
        });
        expect(results).toEqual([changeAction]);
      });
    });
  });
});
