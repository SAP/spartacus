import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { AuthService, SemanticPathService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { NotCheckoutAuthGuard } from './not-checkout-auth.guard';

class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of();
  }
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

class CartServiceStub implements Partial<ActiveCartFacade> {
  isGuestCart(): Observable<boolean> {
    return of(true);
  }
}

describe('NotCheckoutAuthGuard', () => {
  let guard: NotCheckoutAuthGuard;
  let authService: AuthServiceStub;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotCheckoutAuthGuard,
        { provide: SemanticPathService, useClass: SemanticPathServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: ActiveCartFacade,
          useClass: CartServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(NotCheckoutAuthGuard);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  describe('when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    });

    it('should return homepage url', () => {
      let result: boolean | UrlTree;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result.toString()).toBe('/home');
    });
  });

  describe('when user is NOT authorized, but user is guest', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    });

    it('should return cart page url', () => {
      let result: boolean | UrlTree;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result.toString()).toBe('/cart');
    });
  });

  describe('when user is NOT authorized nor guest', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
      spyOn(activeCartFacade, 'isGuestCart').and.returnValue(of(false));
    });

    it('should return true', () => {
      let result: boolean | UrlTree;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });
});
