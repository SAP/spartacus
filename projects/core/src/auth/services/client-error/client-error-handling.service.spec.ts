import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { AuthService } from '../../facade/auth.service';
import { ClientToken } from '../../models/token-types.model';

import { ClientErrorHandlingService } from './client-error-handling.service';

class MockHttpHandler extends HttpHandler {
  handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return of(null);
  }
}

class AuthServiceStub {
  clientToken$: Observable<ClientToken>;
  refreshClientToken(): Observable<ClientToken> {
    return of({
      access_token: 'refreshToken',
      token_type: 'mock',
      expires_in: 12342,
      scope: 'xxx'
    });
  }
}

const clientToken: ClientToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  expires_in: 1000,
  scope: 'xxx'
};

const newClientToken: ClientToken = {
  access_token: 'xxx yyy zzz',
  token_type: 'bearer',
  expires_in: 1000,
  scope: 'xxx'
};

describe('ClientErrorHandlingService', () => {
  let httpRequest = new HttpRequest('GET', '/');
  let service: ClientErrorHandlingService;
  let httpHandler: HttpHandler;
  let authService: AuthServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ClientErrorHandlingService,
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: HttpHandler, useClass: MockHttpHandler }
      ]
    });

    service = TestBed.get(ClientErrorHandlingService);
    httpHandler = TestBed.get(HttpHandler);
    authService = TestBed.get(AuthService);

    spyOn(httpHandler, 'handle').and.callThrough();
  });

  describe(`handleExpiredClientToken`, () => {
    it('should get a new client token and resend the request', () => {
      spyOn(authService, 'refreshClientToken').and.returnValue(
        of(newClientToken)
      );
      authService.clientToken$ = of(clientToken);

      const sub = service
        .handleExpiredClientToken(httpRequest, httpHandler)
        .subscribe();
      expect(authService.refreshClientToken).toHaveBeenCalled();

      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `${newClientToken.token_type} ${
            newClientToken.access_token
          }`
        }
      });
      expect(httpHandler.handle).toHaveBeenCalledWith(httpRequest);
      sub.unsubscribe();
    });
  });
});
