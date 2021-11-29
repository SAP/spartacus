import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  AuthService,
  SemanticPathService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { NotCheckoutAuthGuard } from './not-checkout-auth.guard';
import createSpy = jasmine.createSpy;

class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn = createSpy().and.returnValue(of());
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get = createSpy().and.returnValue('');
}

class CartServiceStub implements Partial<ActiveCartService> {
  isGuestCart = createSpy().and.returnValue(true);
}

describe('NotCheckoutAuthGuard', () => {
  let guard: NotCheckoutAuthGuard;
  let authService: AuthService;
  let activeCartService: ActiveCartService;
  let semanticPathService: SemanticPathService;

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
    semanticPathService = TestBed.inject(SemanticPathService);
  });

  describe('when user is authorized,', () => {
    beforeEach(() => {
      authService.isUserLoggedIn = createSpy().and.returnValue(of(true));
      semanticPathService.get = createSpy().and.returnValue('/home');
    });

    it('should return homepage url', () => {
      let result: boolean | UrlTree | undefined;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result?.toString()).toBe('/home');
    });
  });

  describe('when user is NOT authorized, but user is guest', () => {
    beforeEach(() => {
      authService.isUserLoggedIn = createSpy().and.returnValue(of(false));
      semanticPathService.get = createSpy().and.returnValue('/cart');
    });

    it('should return cart page url', () => {
      let result: boolean | UrlTree | undefined;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result?.toString()).toBe('/cart');
    });
  });

  describe('when user is NOT authorized nor guest', () => {
    beforeEach(() => {
      authService.isUserLoggedIn = createSpy().and.returnValue(of(false));
      activeCartService.isGuestCart = createSpy().and.returnValue(false);
    });

    it('should return true', () => {
      let result: boolean | UrlTree | undefined;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });
});
