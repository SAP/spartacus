import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConfigModule } from '../../../config/config.module';
import { SiteTheme } from '../../../model/misc.model';
import { BaseOccModule } from '../../../occ/base-occ.module';
import { SiteThemeConfig } from '../../config/site-theme-config';
import { SiteThemeActions } from '../actions/index';
import * as fromEffects from './site-themes.effect';

const themes: SiteTheme[] = [{ i18nNameKey: 'dark', className: 'dark' }];
const mockSiteThemeConfig: SiteThemeConfig = {
  siteTheme: {
    optionalThemes: themes,
  },
};

describe('Themes Effects', () => {
  let actions$: Subject<SiteThemeActions.SiteThemesAction>;
  let effects: fromEffects.SiteThemesEffects;
  let mockState: BehaviorSubject<string>;

  beforeEach(() => {
    actions$ = new Subject();
    mockState = new BehaviorSubject('');
    const mockStore: Partial<Store<any>> = {
      select: () => mockState,
    };

    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, BaseOccModule],
      providers: [
        fromEffects.SiteThemesEffects,
        provideMockActions(() => actions$),
        { provide: Store, useValue: mockStore },
        { provide: SiteThemeConfig, useValue: mockSiteThemeConfig },
      ],
    });

    effects = TestBed.inject(fromEffects.SiteThemesEffects);
  });

  describe('activateTheme$', () => {
    describe('when theme is set for the first time', () => {
      it('should NOT dispatch theme change action', () => {
        const results: any[] = [];
        effects.activateSiteTheme$.subscribe((a) => results.push(a));
        mockState.next('light');
        expect(results).toEqual([]);
      });
    });

    describe('when theme is set for the next time', () => {
      it('should dispatch theme change action', () => {
        const results: any[] = [];
        effects.activateSiteTheme$.subscribe((a) => results.push(a));

        mockState.next('dark');
        mockState.next('light');

        const changeAction = new SiteThemeActions.SiteThemeChange({
          previous: 'dark',
          current: 'light',
        });
        expect(results).toEqual([changeAction]);
      });
    });
  });
});
