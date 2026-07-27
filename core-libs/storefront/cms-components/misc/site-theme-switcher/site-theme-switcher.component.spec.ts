import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  SiteTheme,
  TranslationService,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { of } from 'rxjs';
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
  let themeSwitcherComponentService: jasmine.SpyObj<SiteThemeSwitcherComponentService>;

  beforeEach(async () => {
    const themeSwitcherServiceSpy = jasmine.createSpyObj(
      'ThemeSwitcherComponentService',
      ['getItems', 'getActiveItem', 'setActive']
    );

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
    ) as jasmine.SpyObj<SiteThemeSwitcherComponentService>;
    themeSwitcherComponentService.getItems.and.returnValue(of([]));
    themeSwitcherComponentService.getActiveItem.and.returnValue(of(''));
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

    it('should get items from the service', (done: DoneFn) => {
      // items$ is set in ngOnInit from the service stub — re-create with MOCK_ITEMS
      themeSwitcherComponentService.getItems.and.returnValue(of(MOCK_ITEMS));
      fixture = TestBed.createComponent(SiteThemeSwitcherComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.items$.subscribe((items) => {
        expect(items).toEqual(MOCK_ITEMS);
        done();
      });
    });

    it('should get active item from the service', (done: DoneFn) => {
      const activeItemMock = 'theme1';
      // activeItem$ is set in ngOnInit — re-create with the desired stub value
      themeSwitcherComponentService.getActiveItem.and.returnValue(
        of(activeItemMock)
      );
      fixture = TestBed.createComponent(SiteThemeSwitcherComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.activeItem$.subscribe((activeItem) => {
        expect(activeItem).toBe(activeItemMock);
        done();
      });
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
      themeSwitcherComponentService.getItems.and.returnValue(of(MOCK_ITEMS));
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

  describe('when a11yNavigationSpaceKeyOnKeyUp toggle is on', () => {
    beforeEach(async () => {
      await TestBed.resetTestingModule();
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
            useValue: jasmine.createSpyObj('ThemeSwitcherComponentService', [
              'getItems',
              'getActiveItem',
              'setActive',
            ]),
          },
          { provide: TranslationService, useClass: MockTranslationService },
          provideMockFeatureToggles({
            a11ySiteContextCaretClick: true,
            a11yNavigationSpaceKeyOnKeyUp: true,
          }),
        ],
      }).compileComponents();

      themeSwitcherComponentService = TestBed.inject(
        SiteThemeSwitcherComponentService
      ) as jasmine.SpyObj<SiteThemeSwitcherComponentService>;
      themeSwitcherComponentService.getItems.and.returnValue(of(MOCK_ITEMS));
      themeSwitcherComponentService.getActiveItem.and.returnValue(of('theme1'));

      fixture = TestBed.createComponent(SiteThemeSwitcherComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render ng-select instead of native select', () => {
      expect(fixture.debugElement.query(By.css('ng-select'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('select'))).toBeNull();
    });

    it('should not render the native select label wrapper', () => {
      expect(fixture.debugElement.query(By.css('label'))).toBeNull();
    });

    it('should render .cx-ng-select-label wrapper with a span', () => {
      const wrapper = fixture.debugElement.query(By.css('.cx-ng-select-label'));
      expect(wrapper).toBeTruthy();
      expect(wrapper.query(By.css('span'))).toBeTruthy();
    });

    it('should sync selectedItem with the active item from the service', () => {
      expect(component.selectedItem).toBe('theme1');
    });

    it('should call setActive on the service when selection changes', () => {
      component.activeItem = 'theme2';
      expect(themeSwitcherComponentService.setActive).toHaveBeenCalledWith(
        'theme2'
      );
    });

    it('should provide translatedItems$ with a label property for each theme', (done) => {
      component.translatedItems$.subscribe((items) => {
        expect(items.length).toBe(2);
        // MockTranslationService.translate() returns 'of' for any key
        items.forEach((item) => expect(item.label).toBe('of'));
        done();
      });
    });
  });
});
