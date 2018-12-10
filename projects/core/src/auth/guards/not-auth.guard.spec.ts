import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationExtras } from '@angular/router';

import { RoutingService } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { AuthService } from '../facade/auth.service';
import { UserToken } from '../models/token-types.model';

import { NotAuthGuard } from './not-auth.guard';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test'
} as UserToken;

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}

class RoutingServiceStub {
  go(_path: any[], _query?: object, _extras?: NavigationExtras) {}
  translateAndGo() {}
}

describe('NotAuthGuard', () => {
  let authGuard: NotAuthGuard;
  let authService: AuthServiceStub;
  let service: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotAuthGuard,
        { provide: RoutingService, useClass: RoutingServiceStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ],
      imports: [RouterTestingModule]
    });
    authService = TestBed.get(AuthService);
    authGuard = TestBed.get(NotAuthGuard);
    service = TestBed.get(RoutingService);
  });

  describe(', when user is authorised,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));
    });

    it('should return false', () => {
      let result: boolean;
      authGuard
        .canActivate()
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should redirect to homepage', () => {
      spyOn(service, 'translateAndGo');
      authGuard
        .canActivate()
        .subscribe()
        .unsubscribe();
      expect(service.translateAndGo).toHaveBeenCalledWith({ route: ['home'] });
    });
  });

  describe(', when user is NOT authorised,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(
        of({ access_token: undefined } as UserToken)
      );
    });

    it('should return true', () => {
      let result: boolean;
      authGuard
        .canActivate()
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should not redirect', () => {
      spyOn(service, 'translateAndGo');
      authGuard
        .canActivate()
        .subscribe()
        .unsubscribe();
      expect(service.translateAndGo).not.toHaveBeenCalled();
    });
  });
});
