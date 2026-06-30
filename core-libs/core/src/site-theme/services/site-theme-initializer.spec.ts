import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { ConfigInitializerService } from '../../config';
import { SiteThemeService } from '../facade';
import { SiteThemeInitializer } from './site-theme-initializer';
import { SiteThemePersistenceService } from './site-theme-persistence.service';
import { SiteContextConfig } from '../../site-context';

const mockDefaultTheme = 'default';
const mockSiteContextConfig: SiteContextConfig = {
  context: { theme: [mockDefaultTheme] },
};

class MockSiteThemeService implements Partial<SiteThemeService> {
  isInitialized() {
    return false;
  }
  setActive(_className: string) {}
  getDefault() {
    return {
      className: mockDefaultTheme,
      i18nNameKey: 'siteThemeSwitcher.themes.default',
    };
  }
}

class MockSiteThemePersistenceService
  implements Partial<SiteThemePersistenceService>
{
  initSync = vi.fn().mockReturnValue(of(EMPTY));
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable = () => of(mockSiteContextConfig);
}

describe('SiteThemeInitializer', () => {
  let initializer: SiteThemeInitializer;
  let siteThemeService: SiteThemeService;
  let siteThemePersistenceService: SiteThemePersistenceService;

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
      ],
    });

    siteThemePersistenceService = TestBed.inject(SiteThemePersistenceService);
    siteThemeService = TestBed.inject(SiteThemeService);
    initializer = TestBed.inject(SiteThemeInitializer);
    vi.spyOn(siteThemeService, 'setActive');
  });

  it('should be created', () => {
    expect(initializer).toBeTruthy();
  });

  describe('initialize', () => {
    it('should call SiteThemePersistenceService initSync()', () => {
      vi.spyOn(siteThemeService, 'isInitialized').mockReturnValue(false);
      spyOn<any>(initializer, 'setFallbackValue').mockReturnValue(of(null));
      initializer.initialize();
      expect(siteThemePersistenceService.initSync).toHaveBeenCalled();
      expect(initializer['setFallbackValue']).toHaveBeenCalled();
    });

    it('should set default theme is the theme is NOT initialized', () => {
      vi.spyOn(siteThemeService, 'isInitialized').mockReturnValue(false);
      initializer.initialize();
      expect(siteThemeService.setActive).toHaveBeenCalledWith(mockDefaultTheme);
    });

    it('should NOT set default from config is the theme is initialized', () => {
      vi.spyOn(siteThemeService, 'isInitialized').mockReturnValue(true);
      initializer.initialize();
      expect(siteThemeService.setActive).not.toHaveBeenCalled();
    });
  });
});
