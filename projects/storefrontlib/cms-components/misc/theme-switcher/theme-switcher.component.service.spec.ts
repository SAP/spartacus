import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ThemeService } from '@spartacus/storefront';
import { SiteThemeService, Theme } from '@spartacus/core';
import { ThemeSwitcherComponentService } from './theme-switcher.component.service';

describe('ThemeSwitcherComponentService', () => {
  let service: ThemeSwitcherComponentService;
  let themeService: jasmine.SpyObj<ThemeService>;
  let siteThemeService: jasmine.SpyObj<SiteThemeService>;

  beforeEach(() => {
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', ['setTheme']);
    const siteThemeServiceSpy = jasmine.createSpyObj('SiteThemeService', [
      'getAll',
      'getActive',
      'setActive',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ThemeSwitcherComponentService,
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: SiteThemeService, useValue: siteThemeServiceSpy },
      ],
    });

    service = TestBed.inject(ThemeSwitcherComponentService);
    themeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    siteThemeService = TestBed.inject(
      SiteThemeService
    ) as jasmine.SpyObj<SiteThemeService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getItems should return all themes', (done: DoneFn) => {
    const mockThemes: Theme[] = [
      { className: 'theme1' },
      { className: 'theme2' },
    ];
    siteThemeService.getAll.and.returnValue(of(mockThemes));

    service.getItems().subscribe((themes) => {
      expect(themes).toEqual(mockThemes);
      done();
    });

    expect(siteThemeService.getAll).toHaveBeenCalled();
  });

  it('getActiveItem should return active theme and set it', (done: DoneFn) => {
    const activeTheme = 'theme1';
    siteThemeService.getActive.and.returnValue(of(activeTheme));

    service.getActiveItem().subscribe((theme) => {
      expect(theme).toBe(activeTheme);
      expect(themeService.setTheme).toHaveBeenCalledWith(activeTheme);
      done();
    });

    expect(siteThemeService.getActive).toHaveBeenCalled();
  });

  it('setActive should set the active theme', () => {
    const newActiveTheme = 'theme2';
    service.setActive(newActiveTheme);
    expect(siteThemeService.setActive).toHaveBeenCalledWith(newActiveTheme);
  });
});
