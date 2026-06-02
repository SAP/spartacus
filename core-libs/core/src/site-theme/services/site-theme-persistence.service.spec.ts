import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { SiteThemePersistenceService } from './site-theme-persistence.service';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteThemeService } from '../facade/site-theme.service';
import { SiteThemeConfig } from '../config/site-theme-config';
import { SITE_THEME_ID } from '../providers/site-theme-id';

describe('SiteThemePersistenceService', () => {
  let service: SiteThemePersistenceService;
  let statePersistenceService: jasmine.SpyObj<StatePersistenceService>;
  let siteThemeService: jasmine.SpyObj<SiteThemeService>;

  beforeEach(() => {
    const statePersistenceSpy = jasmine.createSpyObj(
      'StatePersistenceService',
      ['syncWithStorage']
    );
    const siteThemeSpy = jasmine.createSpyObj('SiteThemeService', [
      'getActive',
      'isInitialized',
      'setActive',
    ]);

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
    ) as jasmine.SpyObj<StatePersistenceService>;
    siteThemeService = TestBed.inject(
      SiteThemeService
    ) as jasmine.SpyObj<SiteThemeService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize sync with storage', () => {
    const activeTheme$ = new ReplaySubject<string>(1);
    siteThemeService.getActive.and.returnValue(activeTheme$);

    service.initSync().subscribe();

    expect(statePersistenceService.syncWithStorage).toHaveBeenCalledWith({
      key: SITE_THEME_ID,
      state$: activeTheme$,
      onRead: jasmine.any(Function),
    });
  });

  it('should handle onRead correctly', () => {
    const valueFromStorage = 'dark-theme';
    siteThemeService.isInitialized.and.returnValue(false);

    service['onRead'](valueFromStorage);

    expect(siteThemeService.setActive).toHaveBeenCalledWith(valueFromStorage);
  });

  it('should complete initialized$ on onRead', () => {
    const valueFromStorage = 'dark-theme';
    const initialized$ = service['initialized$'];
    const spy = spyOn(initialized$, 'next').and.callThrough();
    const spyComplete = spyOn(initialized$, 'complete').and.callThrough();
    service['onRead'](valueFromStorage);

    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
