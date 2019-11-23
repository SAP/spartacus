import { Component, DebugElement, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, WishListService } from '@spartacus/core';
import { WishListComponent } from './wish-list.component';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { By } from '@angular/platform-browser';

class MockAuthService {
  isUserLoggedIn = createSpy().and.returnValue(of(true));
}

const MockWishListService = jasmine.createSpyObj('WishListService', [
  'getWishList',
]);

@Component({
  selector: 'cx-wish-list-item',
  template: '',
})
class MockWishListItemComponent {
  @Input()
  cartEntry;
}

describe('WishListComponent', () => {
  let component: WishListComponent;
  let fixture: ComponentFixture<WishListComponent>;
  let el: DebugElement;

  let wishListService: WishListService;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WishListComponent, MockWishListItemComponent],
      providers: [
        {
          provide: WishListService,
          useValue: MockWishListService,
        },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    wishListService = el.injector.get(WishListService as Type<WishListService>);
    authService = fixture.debugElement.injector.get(AuthService as Type<
      AuthService
    >);
    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get wish list', () => {
    expect(wishListService.getWishList).toHaveBeenCalled();
  });

  it('should not display component when user is not logged in', () => {
    authService.isUserLoggedIn = jasmine.createSpy().and.returnValue(of(false));

    expect(el.query(By.css('cx-page'))).toBeNull();
  });
});
