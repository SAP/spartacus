import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationExtras } from '@angular/router';

import { of, Observable } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { UserToken } from '../models/token-types.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { UrlCommands } from '../../routing/configurable-routes/url-translation/url-command';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test',
} as UserToken;

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}
class RoutingServiceStub {
  go(_path: any[] | UrlCommands, _query?: object, _extras?: NavigationExtras) {}
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let service: RoutingService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: RoutingService,
          useClass: RoutingServiceStub,
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });
    authGuard = TestBed.get(AuthGuard);
    service = TestBed.get(RoutingService);
    authService = TestBed.get(AuthService);

    spyOn(service, 'go').and.stub();
  });

  it('should return false', () => {
    spyOn(authService, 'getUserToken').and.returnValue(
      of({ access_token: undefined } as UserToken)
    );
    let result: boolean;

    authGuard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toBe(false);
  });

  it('should return true', () => {
    spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));

    let result: boolean;

    authGuard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toBe(true);
  });
});
