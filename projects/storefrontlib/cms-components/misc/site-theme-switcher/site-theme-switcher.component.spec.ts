import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SiteThemeSwitcherComponent } from './site-theme-switcher.component';
import { SiteThemeSwitcherComponentService } from './site-theme-switcher.component.service';
import { I18nTestingModule, SiteTheme } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';

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
      imports: [I18nTestingModule, IconModule],
      declarations: [SiteThemeSwitcherComponent],
      providers: [
        {
          provide: SiteThemeSwitcherComponentService,
          useValue: themeSwitcherServiceSpy,
        },
      ],
    }).compileComponents();

    themeSwitcherComponentService = TestBed.inject(
      SiteThemeSwitcherComponentService
    ) as jasmine.SpyObj<SiteThemeSwitcherComponentService>;
    themeSwitcherComponentService.getItems.and.returnValue(of([]));
    themeSwitcherComponentService.getActiveItem.and.returnValue(of(''));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items from the service', (done: DoneFn) => {
    const itemsMock: Array<SiteTheme> = [
      { className: 'theme1', i18nNameKey: 'theme1' },
      { className: 'theme2', i18nNameKey: 'theme1' },
    ];
    themeSwitcherComponentService.getItems.and.returnValue(of(itemsMock));

    component.items$.subscribe((items) => {
      expect(items).toEqual(itemsMock);
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
