import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { BaseSiteService, I18nTestingModule, WindowRef } from '@spartacus/core';
import {
  IconModule,
  ThemeService,
  ThemeSwitcherConfig,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ThemeSwitcherComponent', () => {
  const mockCustomerTheme = 'mockCustomerTheme';

  class MockBaseSiteService {
    get() {
      return of({ theme: mockCustomerTheme });
    }
  }

  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;
  let mockThemeSwitcherConfig: ThemeSwitcherConfig;
  let mockThemeService: jasmine.SpyObj<ThemeService>;
  let mockBaseSiteService: BaseSiteService;

  let mockWindowRef: any;

  beforeEach(async () => {
    mockThemeSwitcherConfig = {
      themeSwitcher: {
        themes: [{ className: 'theme-default' }, { className: 'theme-dark' }],
      },
    };
    mockThemeService = jasmine.createSpyObj('ThemeService', ['setTheme']);

    mockWindowRef = {
      localStorage: jasmine.createSpyObj('Storage', ['getItem', 'setItem']),
    };

    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconModule],
      declarations: [ThemeSwitcherComponent],
      providers: [
        { provide: ThemeSwitcherConfig, useValue: mockThemeSwitcherConfig },
        { provide: ThemeService, useValue: mockThemeService },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: WindowRef, useValue: mockWindowRef },
      ],
    })
      .overrideComponent(ThemeSwitcherComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
    mockBaseSiteService = TestBed.inject(BaseSiteService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize themes from the config', () => {
    expect(component.themes.length).toBe(3);
    expect(component.themes[0].className).toBe('theme-default');
    expect(component.themes[1].className).toBe('theme-dark');
    expect(component.themes[2].className).toBe(mockCustomerTheme);
  });

  it('should set the selected theme from saved theme on init', () => {
    mockWindowRef.localStorage.getItem.and.returnValue('theme-dark');

    component.ngOnInit();
    expect(component.selectedTheme.className).toBe('theme-dark');
    expect(mockThemeService.setTheme).toHaveBeenCalledWith('theme-dark');
  });

  it('should set the first theme as default if no theme is saved', () => {
    mockWindowRef.localStorage.getItem.and.returnValue(null);
    component.ngOnInit();
    expect(component.selectedTheme.className).toBe('theme-default');
    expect(mockThemeService.setTheme).toHaveBeenCalledWith('theme-default');
  });

  it('should add a site theme if it does not exist', () => {
    mockWindowRef.localStorage.getItem.and.returnValue(null);
    spyOn(mockBaseSiteService, 'get').and.returnValue(
      of({ theme: 'theme-site' })
    );
    component.ngOnInit();
    expect(component.themes.length).toBe(4);
  });

  it('should handle theme selection', () => {
    component.onSelect('theme-dark');
    expect(component.selectedTheme.className).toBe('theme-dark');
    expect(mockThemeService.setTheme).toHaveBeenCalledWith('theme-dark');
    expect(mockWindowRef.localStorage.setItem).toHaveBeenCalledWith(
      'theme',
      'theme-dark'
    );
  });
});
