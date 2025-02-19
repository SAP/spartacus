import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SiteThemeSwitcherComponent } from './site-theme-switcher.component';
import { SiteThemeSwitcherComponentService } from './site-theme-switcher.component.service';
import {
  I18nTestingModule,
  SiteTheme,
  TranslationService,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
      imports: [I18nTestingModule, IconModule, CommonModule],
      declarations: [SiteThemeSwitcherComponent],
      providers: [
        {
          provide: SiteThemeSwitcherComponentService,
          useValue: themeSwitcherServiceSpy,
        },
        { provide: TranslationService, useClass: MockTranslationService },
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
      themeSwitcherComponentService.getItems.and.returnValue(of(MOCK_ITEMS));

      component.items$.subscribe((items) => {
        expect(items).toEqual(MOCK_ITEMS);
        done();
      });
    });

    it('should get active item from the service', (done: DoneFn) => {
      const activeItemMock = 'theme1';
      themeSwitcherComponentService.getActiveItem.and.returnValue(
        of(activeItemMock)
      );

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
      const options = fixture.debugElement.queryAll(By.css('option'));
      expect(options.length).toEqual(2);
      options.forEach((option, index: number) => {
        expect(option.nativeElement.getAttribute('aria-label')).toContain(
          `${index + 1} of ${options.length}`
        );
      });
    });
  });
});
