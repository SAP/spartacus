import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  SiteTheme,
  TranslationService,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { firstValueFrom, of } from 'rxjs';
import { SiteThemeSwitcherComponent } from './site-theme-switcher.component';
import { SiteThemeSwitcherComponentService } from './site-theme-switcher.component.service';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';

class MockTranslationService {
  translate() {
    return of('of');
  }
}

const MOCK_ITEMS: Array<SiteTheme> = [
  { className: 'theme1', i18nNameKey: 'theme1' },
  { className: 'theme2', i18nNameKey: 'theme2' },
];

describe('ThemeSwitcherComponent', () => {
  let component: SiteThemeSwitcherComponent;
  let fixture: ComponentFixture<SiteThemeSwitcherComponent>;
  let themeSwitcherComponentService: any;

  beforeEach(async () => {
    const themeSwitcherServiceSpy = { getItems: vi.fn(), getActiveItem: vi.fn(), setActive: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconModule,
        CommonModule,
        SiteThemeSwitcherComponent,
      ],
      providers: [
        {
          provide: SiteThemeSwitcherComponentService,
          useValue: themeSwitcherServiceSpy,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        provideMockFeatureToggles({ a11ySiteContextCaretClick: true }),
      ],
    }).compileComponents();

    themeSwitcherComponentService = TestBed.inject(
      SiteThemeSwitcherComponentService
    ) as any;
    themeSwitcherComponentService.getItems.mockReturnValue(of([]));
    themeSwitcherComponentService.getActiveItem.mockReturnValue(of(''));
  });

  describe('when no options available', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SiteThemeSwitcherComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should get items from the service', async () => {
      themeSwitcherComponentService.getItems.mockReturnValue(of(MOCK_ITEMS));
      const items = await firstValueFrom(component.items$);
      expect(items).toEqual(MOCK_ITEMS);
    });

    it('should get active item from the service', async () => {
      const activeItemMock = 'theme1';
      themeSwitcherComponentService.getActiveItem.mockReturnValue(
        of(activeItemMock)
      );
      const activeItem = await firstValueFrom(component.activeItem$);
      expect(activeItem).toBe(activeItemMock);
    });

    it('should set active item using the service', () => {
      const newActiveItem = 'theme2';
      component.activeItem = newActiveItem;
      expect(themeSwitcherComponentService.setActive).toHaveBeenCalledWith(
        newActiveItem
      );
    });
  });

  describe('when the options available', () => {
    beforeEach(() => {
      themeSwitcherComponentService.getItems.mockReturnValue(of(MOCK_ITEMS));
      fixture = TestBed.createComponent(SiteThemeSwitcherComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should append an aria-label to options', () => {
      const options = fixture.debugElement.queryAll(
        By.css('.cx-select-wrapper option')
      );
      expect(options.length).toEqual(2);
      options.forEach((option, index: number) => {
        expect(option.nativeElement.getAttribute('aria-label')).toContain(
          `${index + 1} of ${options.length}`
        );
      });
    });
  });
});
