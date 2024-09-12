import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SiteThemeService, SiteTheme } from '@spartacus/core';
import { SiteThemeSwitcherComponentService } from './site-theme-switcher.component.service';

describe('SiteThemeSwitcherComponentService', () => {
  let service: SiteThemeSwitcherComponentService;
  let siteThemeService: jasmine.SpyObj<SiteThemeService>;

  beforeEach(() => {
    const siteThemeServiceSpy = jasmine.createSpyObj('SiteThemeService', [
      'getAll',
      'getActive',
      'setActive',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SiteThemeSwitcherComponentService,
        { provide: SiteThemeService, useValue: siteThemeServiceSpy },
      ],
    });

    service = TestBed.inject(SiteThemeSwitcherComponentService);
    siteThemeService = TestBed.inject(
      SiteThemeService
    ) as jasmine.SpyObj<SiteThemeService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getItems should return all themes', (done: DoneFn) => {
    const mockThemes: SiteTheme[] = [
      { className: 'theme1', i18nNameKey: 'theme1' },
      { className: 'theme2', i18nNameKey: 'theme2' },
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
