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

  it('should return false', () => {
    spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));

    let result: boolean;
    authGuard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toBe(false);
  });

  it('should return true', () => {
    spyOn(authService, 'getUserToken').and.returnValue(
      of({ access_token: undefined } as UserToken)
    );

    let result: boolean;
    authGuard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toBe(true);
  });

  it('should redirect to homepage if cannot activate route', () => {
    authService.userToken$ = of(mockUserToken);
    spyOn(service, 'translateAndGo');
    authGuard
      .canActivate()
      .subscribe()
      .unsubscribe();
    expect(service.translateAndGo).toHaveBeenCalledWith({ route: ['home'] });
  });
});
