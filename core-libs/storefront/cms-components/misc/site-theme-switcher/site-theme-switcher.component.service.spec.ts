import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { SiteThemeService, SiteTheme } from '@spartacus/core';
import { SiteThemeSwitcherComponentService } from './site-theme-switcher.component.service';

describe('SiteThemeSwitcherComponentService', () => {
  let service: SiteThemeSwitcherComponentService;
  let siteThemeService: any;

  beforeEach(() => {
    const siteThemeServiceSpy = { getAll: vi.fn(), getActive: vi.fn(), setActive: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        SiteThemeSwitcherComponentService,
        { provide: SiteThemeService, useValue: siteThemeServiceSpy },
      ],
    });

    service = TestBed.inject(SiteThemeSwitcherComponentService);
    siteThemeService = TestBed.inject(
      SiteThemeService
    ) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getItems should return all themes', async () => {
    const mockThemes: SiteTheme[] = [
      { className: 'theme1', i18nNameKey: 'theme1' },
      { className: 'theme2', i18nNameKey: 'theme2' },
    ];
    siteThemeService.getAll.mockReturnValue(of(mockThemes));

    const themes = await firstValueFrom(service.getItems());
    expect(themes).toEqual(mockThemes);
    expect(siteThemeService.getAll).toHaveBeenCalled();
  });

  it('getActiveItem should return active theme and set it', async () => {
    const activeTheme = 'theme1';
    siteThemeService.getActive.mockReturnValue(of(activeTheme));

    const theme = await firstValueFrom(service.getActiveItem());
    expect(theme).toBe(activeTheme);
    expect(siteThemeService.getActive).toHaveBeenCalled();
  });

  it('setActive should set the active theme', () => {
    const newActiveTheme = 'theme2';
    service.setActive(newActiveTheme);
    expect(siteThemeService.setActive).toHaveBeenCalledWith(newActiveTheme);
  });
});
