import { inject, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Config } from '../../config/config-tokens';
import { FeatureToggles } from '../../features-config/feature-toggles/feature-toggles-tokens';
import { BaseSite, SiteTheme } from '../../model/misc.model';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { SiteThemeActions } from '../store/actions';

import { SiteThemeStoreModule } from '../store/site-theme-store.module';
import { StateWithSiteTheme } from '../store/state';
import { SiteThemeService } from './site-theme.service';
import createSpy = jasmine.createSpy;

const mockDefaultTheme = 'default';
const mockThemes: SiteTheme[] = [
  {
    className: mockDefaultTheme,
    i18nNameKey: 'siteThemeSwitcher.themes.default',
  },
  { i18nNameKey: 'dark', className: 'dark' },
];

const mockActiveTheme = 'dark';

const mockSiteThemeConfig: Config = {
  context: { theme: [mockDefaultTheme] },
  siteTheme: {
    optionalThemes: [{ i18nNameKey: 'dark', className: 'dark' }],
  },
};

describe('SiteThemeService', () => {
  const mockSelect1 = createSpy('select').and.returnValue(() => of(mockThemes));
  const mockSelect2 = createSpy('select').and.returnValue(() =>
    of(mockActiveTheme)
  );

  let service: SiteThemeService;
  let store: Store<StateWithSiteTheme>;
  let featureToggles: FeatureToggles;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteThemeStoreModule,
      ],
      providers: [
        SiteThemeService,
        { provide: Config, useValue: mockSiteThemeConfig },
        { provide: FeatureToggles, useValue: {} as FeatureToggles },
        {
          provide: BaseSiteService,
          useValue: {
            get: () => of<BaseSite | undefined>(undefined),
          },
        },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(SiteThemeService);
    featureToggles = TestBed.inject(FeatureToggles);
  });

  it('should SiteThemeService is injected', inject(
    [SiteThemeService],
    (Service: SiteThemeService) => {
      expect(Service).toBeTruthy();
    }
  ));

  it('should not load themes when service is constructed', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should be able to get default theme', () => {
    const defaultTheme = service.getDefault();
    expect(defaultTheme).toEqual({
      className: mockDefaultTheme,
      i18nNameKey: 'siteThemeSwitcher.themes.default',
    });
  });

  describe('getDefault with applyBaseSiteThemeFromCms toggle ON', () => {
    let baseSiteService: BaseSiteService;

    beforeEach(() => {
      featureToggles.applyBaseSiteThemeFromCms = true;
      baseSiteService = TestBed.inject(BaseSiteService);
    });

    it('should still prefer the static `config.context.theme` when set', () => {
      // mockSiteThemeConfig has `theme: [mockDefaultTheme]`. Static wins.
      expect(service.getDefault().className).toBe(mockDefaultTheme);
    });

    it('should fall back to the active base site theme when no static theme is configured', () => {
      // Drop the static theme from config so the CMS path kicks in.
      (mockSiteThemeConfig.context as { theme?: string[] }).theme = undefined;
      spyOn(baseSiteService, 'get').and.returnValue(
        of({ uid: 'electronics-spa', theme: 'lambda' } as BaseSite)
      );

      expect(service.getDefault().className).toBe('lambda');

      // restore for sibling tests
      (mockSiteThemeConfig.context as { theme?: string[] }).theme = [
        mockDefaultTheme,
      ];
    });
  });

  it('should be able to get theme', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect1);
    service.getAll().subscribe((results) => {
      expect(results).toEqual(mockThemes);
    });
  });

  it('should be able to get active theme', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect2);
    service.getActive().subscribe((results) => {
      expect(results).toEqual(mockActiveTheme);
    });
  });

  it('should not set active theme', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect1);
    service.setActive('dark_new');
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new SiteThemeActions.SetActiveSiteTheme('dark_new')
    );
  });

  describe('isInitialized', () => {
    it('should return TRUE if a theme is initialized', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect1);
      expect(service.isInitialized()).toBeTruthy();
    });
  });

  describe('isValid', () => {
    it('should return TRUE if the theme is valid', () => {
      expect(service['isValid']('dark')).toBeTruthy();
    });
    it('should return FALSE if the theme is not valid', () => {
      expect(service['isValid']('light')).toBeFalsy();
    });

    describe('with applyBaseSiteThemeFromCms feature toggle ON', () => {
      beforeEach(() => {
        featureToggles.applyBaseSiteThemeFromCms = true;
      });

      it('should accept any className including empty string', () => {
        expect(service['isValid']('any-cms-driven-theme')).toBeTruthy();
        expect(service['isValid']('light')).toBeTruthy();
        expect(service['isValid']('')).toBeTruthy();
      });
    });
  });
});
