import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { ThemeSwitcherComponentService } from './theme-switcher.component.service';
import { I18nTestingModule, SiteTheme } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;
  let themeSwitcherComponentService: jasmine.SpyObj<ThemeSwitcherComponentService>;

  beforeEach(async () => {
    const themeSwitcherServiceSpy = jasmine.createSpyObj(
      'ThemeSwitcherComponentService',
      ['getItems', 'getActiveItem', 'setActive']
    );

    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconModule],
      declarations: [ThemeSwitcherComponent],
      providers: [
        {
          provide: ThemeSwitcherComponentService,
          useValue: themeSwitcherServiceSpy,
        },
      ],
    }).compileComponents();

    themeSwitcherComponentService = TestBed.inject(
      ThemeSwitcherComponentService
    ) as jasmine.SpyObj<ThemeSwitcherComponentService>;
    themeSwitcherComponentService.getItems.and.returnValue(of([]));
    themeSwitcherComponentService.getActiveItem.and.returnValue(of(''));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwitcherComponent);
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
