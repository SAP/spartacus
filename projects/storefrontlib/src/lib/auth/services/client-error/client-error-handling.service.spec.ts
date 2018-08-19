import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as fromRoot from '../../../routing/store';
import * as fromStore from '../../store';
import { ClientErrorHandlingService } from './client-error-handling.service';

class MockHttpHandler extends HttpHandler {
  handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return of(null);
  }
}

describe('ClientErrorHandlingService', () => {
  let service: ClientErrorHandlingService;
  let store: Store<fromStore.AuthState>;

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
