import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  AuthService,
  SemanticPathService,
} from '@spartacus/core';
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

class CartServiceStub implements Partial<ActiveCartService> {
  isGuestCart(): boolean {
    return true;
  }
}

describe('NotCheckoutAuthGuard', () => {
  let guard: NotCheckoutAuthGuard;
  let authService: AuthServiceStub;
  let activeCartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotCheckoutAuthGuard,
        { provide: SemanticPathService, useClass: SemanticPathServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: ActiveCartService,
          useClass: CartServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(NotCheckoutAuthGuard);
    activeCartService = TestBed.inject(ActiveCartService);
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
      spyOn(activeCartService, 'isGuestCart').and.returnValue(false);
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
