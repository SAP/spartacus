import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthRedirectService,
  CartService,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CheckoutLoginComponent } from './checkout-login.component';

import createSpy = jasmine.createSpy;

class MockCartService {
  addEmail = createSpy('MockCartService.addEmail');

  getAssignedUser() {
    return of();
  }
}
class MockRedirectAfterAuthService {
  redirect = createSpy('AuthRedirectService.redirect');
}

const mockEmail = 'xxx@acme.com';

describe('CheckoutLoginComponent', () => {
  let component: CheckoutLoginComponent;
  let fixture: ComponentFixture<CheckoutLoginComponent>;
  let cartService: CartService;
  let authRedirectService: AuthRedirectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [CheckoutLoginComponent],
      providers: [
        { provide: CartService, useClass: MockCartService },
        {
          provide: AuthRedirectService,
          useClass: MockRedirectAfterAuthService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutLoginComponent);
    component = fixture.componentInstance;
    cartService = TestBed.get(CartService);
    authRedirectService = TestBed.get(AuthRedirectService);

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('should add email to cart', () => {
      component.form.controls['userId'].setValue(mockEmail);
      component.submit();

      expect(cartService.addEmail).toHaveBeenCalledWith(mockEmail);
    });

    it('should call auth redirect on success', () => {
      spyOn(cartService, 'getAssignedUser').and.returnValue(
        of({ name: 'guest', uid: 'xxx@acme.com' } as User)
      );

      component.form.controls['userId'].setValue(mockEmail);
      component.submit();

      expect(authRedirectService.redirect).toHaveBeenCalled();
    });

    it('should NOT call auth redirect on failure', () => {
      spyOn(cartService, 'getAssignedUser').and.returnValue(
        of({ name: 'anonymous', uid: 'anonymous' } as User)
      );

      component.form.controls['userId'].setValue(mockEmail);
      component.submit();

      expect(authRedirectService.redirect).not.toHaveBeenCalled();
    });
  });
});
