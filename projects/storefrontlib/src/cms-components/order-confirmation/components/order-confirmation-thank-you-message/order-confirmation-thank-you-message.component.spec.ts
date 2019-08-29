import { Component, Type, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CheckoutService,
  I18nTestingModule,
  Order,
  UserToken,
  AuthService,
  UserService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderConfirmationThankYouMessageComponent } from './order-confirmation-thank-you-message.component';

import createSpy = jasmine.createSpy;
import { By } from '@angular/platform-browser';

@Component({ selector: 'cx-add-to-home-screen-banner', template: '' })
class MockAddtoHomeScreenBannerComponent {}

class MockCheckoutService {
  clearCheckoutData = createSpy();
  getOrderDetails(): Observable<Order> {
    return of({
      code: 'test-code-412',
      guid: 'guid',
      guestCustomer: true,
      paymentInfo: { billingAddress: { email: 'test@test.com' } },
    });
  }
}

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
  }
}

class MockUserService {
  registerGuest = createSpy();
}

class MockRoutingService {
  go = jasmine.createSpy('go');
}

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationThankYouMessageComponent;
  let fixture: ComponentFixture<OrderConfirmationThankYouMessageComponent>;
  let form: DebugElement;

  let userService: UserService;
  let checkoutService: CheckoutService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [
        OrderConfirmationThankYouMessageComponent,
        MockAddtoHomeScreenBannerComponent,
      ],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      OrderConfirmationThankYouMessageComponent
    );

    userService = TestBed.get(UserService as Type<UserService>);
    checkoutService = TestBed.get(CheckoutService as Type<CheckoutService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);

    component = fixture.componentInstance;
    form = fixture.debugElement.query(By.css('form'));
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should do nothing when submit from non-guest customer', () => {
    spyOn(checkoutService, 'getOrderDetails').and.returnValue(
      of({ guid: 'guid', guestCustomer: false })
    );
    component.ngOnInit();
    fixture.detectChanges();
    component.submit();

    expect(userService.registerGuest).not.toHaveBeenCalledWith();
  });

  it('should register customer and redirect to homepage when submit from guest customer', () => {
    const password = 'test password';
    component.guestRegisterForm.controls['password'].setValue(password);
    component.ngOnInit();
    fixture.detectChanges();
    component.submit();

    expect(userService.registerGuest).toHaveBeenCalledWith('guid', password);
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  describe('UI test', () => {
    it('should display order code', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('.cx-page-title')).nativeElement
          .innerHTML
      ).toContain('test-code-412');
    });

    it('shoud not have form for login user', () => {
      spyOn(checkoutService, 'getOrderDetails').and.returnValue(
        of({ guid: 'guid', guestCustomer: false })
      );
      component.ngOnInit();
      fixture.detectChanges();

      expect(form).toEqual(null);
    });

    it('shoud thankYou message contain email', () => {
      // need UI work done first
    });
  });
});
