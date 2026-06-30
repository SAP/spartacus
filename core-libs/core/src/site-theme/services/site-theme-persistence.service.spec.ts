import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { SiteThemePersistenceService } from './site-theme-persistence.service';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteThemeService } from '../facade/site-theme.service';
import { SiteThemeConfig } from '../config/site-theme-config';
import { SITE_THEME_ID } from '../providers/site-theme-id';

describe('SiteThemePersistenceService', () => {
  let service: SiteThemePersistenceService;
  let statePersistenceService: StatePersistenceService;
  let siteThemeService: SiteThemeService;

  beforeEach(() => {
    const statePersistenceSpy = { syncWithStorage: vi.fn() };
    const siteThemeSpy = { 
      getActive: vi.fn(), isInitialized: vi.fn(), setActive: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        SiteThemePersistenceService,
        { provide: StatePersistenceService, useValue: statePersistenceSpy },
        { provide: SiteThemeService, useValue: siteThemeSpy },
        { provide: SiteThemeConfig, useValue: {} },
      ],
    });

    service = TestBed.inject(SiteThemePersistenceService);
    statePersistenceService = TestBed.inject(
      StatePersistenceService
    ) as StatePersistenceService;
    siteThemeService = TestBed.inject(
      SiteThemeService
    ) as SiteThemeService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize sync with storage', () => {
    const activeTheme$ = new ReplaySubject<string>(1);
    siteThemeService.getActive.mockReturnValue(activeTheme$);

    service.initSync().subscribe();

    expect(statePersistenceService.syncWithStorage).toHaveBeenCalledWith({
      key: SITE_THEME_ID,
      state$: activeTheme$,
      onRead: expect.any(Function),
    });
  });

  it('should handle onRead correctly', () => {
    const valueFromStorage = 'dark-theme';
    siteThemeService.isInitialized.mockReturnValue(false);

    service['onRead'](valueFromStorage);

    expect(siteThemeService.setActive).toHaveBeenCalledWith(valueFromStorage);
  });

  it('should complete initialized$ on onRead', () => {
    const valueFromStorage = 'dark-theme';
    const initialized$ = service['initialized$'];
    const spy = vi.spyOn(initialized$, 'next');
    const spyComplete = vi.spyOn(initialized$, 'complete');
    service['onRead'](valueFromStorage);

    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
