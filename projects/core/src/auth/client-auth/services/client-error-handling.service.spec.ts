import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ClientToken } from '../models/client-token.model';
import { ClientErrorHandlingService } from './client-error-handling.service';
import { ClientTokenService } from './client-token.service';

class MockHttpHandler extends HttpHandler {
  handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return of(null);
  }
}

const newClientToken: ClientToken = {
  access_token: 'xxx yyy zzz',
  token_type: 'bearer',
  expires_in: 1000,
  scope: 'xxx',
};

class MockClientTokenService implements Partial<ClientTokenService> {
  refreshClientToken(): Observable<ClientToken> {
    return of(newClientToken);
  }
}

describe('ClientErrorHandlingService', () => {
  let httpRequest = new HttpRequest('GET', '/');
  let service: ClientErrorHandlingService;
  let httpHandler: HttpHandler;
  let clientTokenService: ClientTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ClientErrorHandlingService,
        { provide: ClientTokenService, useClass: MockClientTokenService },
        { provide: HttpHandler, useClass: MockHttpHandler },
      ],
    });

    service = TestBed.inject(ClientErrorHandlingService);
    clientTokenService = TestBed.inject(ClientTokenService);
    httpHandler = TestBed.inject(HttpHandler);

    spyOn(httpHandler, 'handle').and.callThrough();
  });

  describe(`handleExpiredClientToken`, () => {
    it('should get a new client token and resend the request', () => {
      spyOn(clientTokenService, 'refreshClientToken').and.callThrough();

      const sub = service
        .handleExpiredClientToken(httpRequest, httpHandler)
        .subscribe();
      expect(clientTokenService.refreshClientToken).toHaveBeenCalled();

      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `${newClientToken.token_type} ${newClientToken.access_token}`,
        },
      });
      expect(httpHandler.handle).toHaveBeenCalledWith(httpRequest);
      sub.unsubscribe();
    });
  });
});
