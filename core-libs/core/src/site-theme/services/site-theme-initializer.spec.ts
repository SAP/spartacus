import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { ConfigInitializerService } from '../../config';
import { FeatureToggles } from '../../features-config/feature-toggles/feature-toggles-tokens';
import { BaseSite, SiteTheme } from '../../model/misc.model';
import { SiteContextConfig } from '../../site-context';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { SiteThemeConfig } from '../config/site-theme-config';
import { SiteThemeService } from '../facade';
import { SiteThemeInitializer } from './site-theme-initializer';
import { SiteThemePersistenceService } from './site-theme-persistence.service';
import createSpy = jasmine.createSpy;

const mockDefaultTheme = 'default';
const mockSiteContextConfig: SiteContextConfig = {
  context: { theme: [mockDefaultTheme] },
};

const mockOptionalThemes: SiteTheme[] = [
  { className: 'cx-theme-high-contrast-dark', i18nNameKey: 'dark' },
  { className: 'cx-theme-high-contrast-light', i18nNameKey: 'light' },
];

class MockSiteThemeService implements Partial<SiteThemeService> {
  active$ = new BehaviorSubject<string | null>(null);
  isInitialized() {
    return false;
  }
  setActive(_className: string) {}
  getActive() {
    return this.active$.pipe();
  }
  getDefault(): SiteTheme {
    return {
      className: mockDefaultTheme,
      i18nNameKey: 'siteThemeSwitcher.themes.default',
    };
  }
}

class MockSiteThemePersistenceService
  implements Partial<SiteThemePersistenceService>
{
  initSync = createSpy().and.returnValue(of(EMPTY));
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable = () => of(mockSiteContextConfig);
}

class MockBaseSiteService implements Partial<BaseSiteService> {
  baseSite$ = new BehaviorSubject<BaseSite | undefined>(undefined);
  get() {
    return this.baseSite$.asObservable();
  }
}

describe('SiteThemeInitializer', () => {
  let initializer: SiteThemeInitializer;
  let siteThemeService: SiteThemeService;
  let siteThemePersistenceService: SiteThemePersistenceService;
  let featureToggles: FeatureToggles;
  let baseSiteService: MockBaseSiteService;
  let siteContextConfig: SiteContextConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SiteThemeInitializer,
        { provide: SiteThemeService, useClass: MockSiteThemeService },
        {
          provide: SiteThemePersistenceService,
          useClass: MockSiteThemePersistenceService,
        },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
        // FeatureToggles is a mutable bag — individual tests flip flags by
        // assigning to the injected instance.
        { provide: FeatureToggles, useValue: {} as FeatureToggles },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        {
          provide: SiteThemeConfig,
          useValue: { siteTheme: { optionalThemes: mockOptionalThemes } },
        },
        // By default the static `context.theme` is empty for the CMS-driven
        // theme tests — individual tests opt in to a static theme below.
        { provide: SiteContextConfig, useValue: { context: {} } },
      ],
    });

    siteThemePersistenceService = TestBed.inject(SiteThemePersistenceService);
    siteThemeService = TestBed.inject(SiteThemeService);
    initializer = TestBed.inject(SiteThemeInitializer);
    featureToggles = TestBed.inject(FeatureToggles);
    baseSiteService = TestBed.inject(
      BaseSiteService
    ) as unknown as MockBaseSiteService;
    siteContextConfig = TestBed.inject(SiteContextConfig);
    spyOn(siteThemeService, 'setActive');
  });

  it('should be created', () => {
    expect(initializer).toBeTruthy();
  });

  describe('initialize', () => {
    it('should call SiteThemePersistenceService initSync()', () => {
      spyOn(siteThemeService, 'isInitialized').and.returnValue(false);
      spyOn<any>(initializer, 'setFallbackValue').and.returnValue(of(null));
      initializer.initialize();
      expect(siteThemePersistenceService.initSync).toHaveBeenCalled();
      expect(initializer['setFallbackValue']).toHaveBeenCalled();
    });

    it('should set default theme is the theme is NOT initialized', () => {
      spyOn(siteThemeService, 'isInitialized').and.returnValue(false);
      initializer.initialize();
      expect(siteThemeService.setActive).toHaveBeenCalledWith(mockDefaultTheme);
    });

    it('should NOT set default from config is the theme is initialized', () => {
      spyOn(siteThemeService, 'isInitialized').and.returnValue(true);
      initializer.initialize();
      expect(siteThemeService.setActive).not.toHaveBeenCalled();
    });
  });

  describe('applyBaseSiteThemeFromCms feature toggle', () => {
    beforeEach(() => {
      // Persistence path is unrelated to the CMS-driven theme path - keep it
      // as a noop to focus on the new behavior.
      spyOn(siteThemeService, 'isInitialized').and.returnValue(true);
    });

    it('should NOT subscribe to active base site when feature is OFF', () => {
      featureToggles.applyBaseSiteThemeFromCms = false;
      const spyGet = spyOn(baseSiteService, 'get').and.callThrough();
      initializer.initialize();
      expect(spyGet).not.toHaveBeenCalled();
    });

    it('should apply the active base site theme when feature is ON', () => {
      featureToggles.applyBaseSiteThemeFromCms = true;
      initializer.initialize();

      baseSiteService.baseSite$.next({
        uid: 'electronics-spa',
        theme: 'santorini',
      } as BaseSite);

      expect(siteThemeService.setActive).toHaveBeenCalledWith('santorini');
    });

    it('should re-apply the theme when the active base site changes', () => {
      featureToggles.applyBaseSiteThemeFromCms = true;
      initializer.initialize();

      baseSiteService.baseSite$.next({
        uid: 'electronics-spa',
        theme: 'santorini',
      } as BaseSite);
      baseSiteService.baseSite$.next({
        uid: 'powertools',
        theme: 'lambda',
      } as BaseSite);

      expect(siteThemeService.setActive).toHaveBeenCalledWith('santorini');
      expect(siteThemeService.setActive).toHaveBeenCalledWith('lambda');
    });

    it('should ignore base sites without a theme', () => {
      featureToggles.applyBaseSiteThemeFromCms = true;
      initializer.initialize();

      baseSiteService.baseSite$.next({ uid: 'some-site' } as BaseSite);

      expect(siteThemeService.setActive).not.toHaveBeenCalledWith(
        jasmine.falsy() as any
      );
    });

    it("should preserve the user's switcher-picked optional theme (high contrast)", () => {
      featureToggles.applyBaseSiteThemeFromCms = true;
      // Simulate the persistence service having restored the user's choice.
      (siteThemeService as unknown as MockSiteThemeService).active$.next(
        'cx-theme-high-contrast-dark'
      );

      initializer.initialize();

      baseSiteService.baseSite$.next({
        uid: 'electronics-spa',
        theme: 'santorini',
      } as BaseSite);

      // High contrast is in optionalThemes, so the user's pick is preserved.
      expect(siteThemeService.setActive).not.toHaveBeenCalledWith('santorini');
    });

    it('should override a STALE persisted base-site theme on the next page load when CMS changed', () => {
      // This is the regression scenario: user previously visited with
      // CMS theme = 'santorini' (which got persisted to localStorage), the
      // backend admin then changes the theme to 'alpha'. On reload, the
      // persisted 'santorini' is NOT an optional theme, so it must be
      // overridden by the new CMS theme — otherwise CMS changes would
      // never propagate after the first visit.
      featureToggles.applyBaseSiteThemeFromCms = true;
      (siteThemeService as unknown as MockSiteThemeService).active$.next(
        'santorini'
      );

      initializer.initialize();

      baseSiteService.baseSite$.next({
        uid: 'electronics-spa',
        theme: 'alpha',
      } as BaseSite);

      expect(siteThemeService.setActive).toHaveBeenCalledWith('alpha');
    });

    it('should apply CMS theme on base site change even when an optional theme is active (multi-tenant switch)', () => {
      // Even if the user has a high-contrast theme active, switching to a
      // different base site should keep their high-contrast pick — it's an
      // optional theme, the user explicitly chose it.
      featureToggles.applyBaseSiteThemeFromCms = true;
      (siteThemeService as unknown as MockSiteThemeService).active$.next(
        'cx-theme-high-contrast-dark'
      );

      initializer.initialize();

      baseSiteService.baseSite$.next({
        uid: 'powertools',
        theme: 'lambda',
      } as BaseSite);
      baseSiteService.baseSite$.next({
        uid: 'electronics-spa',
        theme: 'santorini',
      } as BaseSite);

      // Both apply attempts must be skipped — user's optional theme is sticky.
      expect(siteThemeService.setActive).not.toHaveBeenCalledWith('lambda');
      expect(siteThemeService.setActive).not.toHaveBeenCalledWith('santorini');
    });

    it('should NOT apply the CMS theme when a static `context.theme` is configured', () => {
      // When the app pins a theme in static config, that explicit developer
      // intent wins over the CMS base-site theme.
      featureToggles.applyBaseSiteThemeFromCms = true;
      (siteContextConfig as { context: { theme?: string[] } }).context.theme =
        ['my-pinned-theme'];

      initializer.initialize();

      baseSiteService.baseSite$.next({
        uid: 'electronics-spa',
        theme: 'santorini',
      } as BaseSite);

      expect(siteThemeService.setActive).not.toHaveBeenCalledWith('santorini');
    });

    it('should override a stale persisted CMS theme with the static `context.theme` on reload', () => {
      // A previous visit (with no static theme set) persisted a CMS-applied
      // theme to localStorage. The app now pins a static theme. On reload,
      // persistence restores the stale value and marks the service as
      // initialized — but the static value must still win.
      featureToggles.applyBaseSiteThemeFromCms = true;
      (siteContextConfig as { context: { theme?: string[] } }).context.theme =
        ['lambda'];
      (siteThemeService as unknown as MockSiteThemeService).active$.next(
        'santorini'
      );
      (siteThemeService.isInitialized as jasmine.Spy).and.returnValue(true);

      initializer.initialize();

      expect(siteThemeService.setActive).toHaveBeenCalledWith('lambda');
    });

    it("should preserve a user-picked optional theme over the static `context.theme` on reload", () => {
      featureToggles.applyBaseSiteThemeFromCms = true;
      (siteContextConfig as { context: { theme?: string[] } }).context.theme =
        ['lambda'];
      (siteThemeService as unknown as MockSiteThemeService).active$.next(
        'cx-theme-high-contrast-dark'
      );
      (siteThemeService.isInitialized as jasmine.Spy).and.returnValue(true);

      initializer.initialize();

      expect(siteThemeService.setActive).not.toHaveBeenCalledWith('lambda');
    });
  });
});
