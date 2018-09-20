import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { ClientAuthenticationToken } from '../../models/token-types.model';

import { ClientErrorHandlingService } from './client-error-handling.service';

import * as fromRoot from '../../../routing/store';
import * as fromStore from '../../store';

class MockHttpHandler extends HttpHandler {
  handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return of(null);
  }
}

const clientToken: ClientAuthenticationToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  expires_in: 1000,
  scope: 'xxx'
};

const newClientToken: ClientAuthenticationToken = {
  access_token: 'xxx yyy zzz',
  token_type: 'bearer',
  expires_in: 1000,
  scope: 'xxx'
};

describe('ClientErrorHandlingService', () => {
  let httpRequest = new HttpRequest('GET', '/');
  let service: ClientErrorHandlingService;
  let store: Store<fromStore.AuthState>;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          auth: combineReducers(fromStore.getReducers())
        })
      ],
      providers: [
        ClientErrorHandlingService,
        { provide: HttpHandler, useClass: MockHttpHandler }
      ]
    });

    store = TestBed.get(Store);
    service = TestBed.get(ClientErrorHandlingService);
    httpHandler = TestBed.get(HttpHandler);

    spyOn(httpHandler, 'handle').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe(`handleExpiredClientToken`, () => {
    it('should get a new client token and resend the request', () => {
      store.dispatch(new fromStore.LoadClientTokenSuccess(clientToken));
      service.handleExpiredClientToken(httpRequest, httpHandler).subscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.LoadClientToken()
      );

      store.dispatch(new fromStore.LoadClientTokenSuccess(newClientToken));
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `${newClientToken.token_type} ${
            newClientToken.access_token
          }`
        }
      });
      expect(httpHandler.handle).toHaveBeenCalledWith(httpRequest);
    });
  });
});
