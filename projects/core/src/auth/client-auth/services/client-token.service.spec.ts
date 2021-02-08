import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ClientToken } from '../models/client-token.model';
import { ClientAuthActions } from '../store/actions/index';
import {
  ClientAuthState,
  CLIENT_AUTH_FEATURE,
} from '../store/client-auth-state';
import * as fromReducers from '../store/reducers/index';
import { ClientTokenService } from './client-token.service';

const mockClientToken = {
  access_token: 'testToken',
} as ClientToken;

describe('ClientTokenService', () => {
  let service: ClientTokenService;
  let store: Store<ClientAuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CLIENT_AUTH_FEATURE, fromReducers.getReducers()),
      ],
      providers: [ClientTokenService],
    });

    service = TestBed.inject(ClientTokenService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose clientToken', () => {
    store.dispatch(
      new ClientAuthActions.LoadClientTokenSuccess(mockClientToken)
    );

    let result: ClientToken;
    service
      .getClientToken()
      .pipe(take(1))
      .subscribe((token) => {
        result = token;
      });

    expect(result).toEqual(mockClientToken);
  });

  it('should call loadClientToken() when no token is present', () => {
    spyOn(store, 'dispatch').and.stub();

    const subscription = service.getClientToken().subscribe((_token) => {});
    subscription.unsubscribe();

    expect(store.dispatch).toHaveBeenCalledWith(
      new ClientAuthActions.LoadClientToken()
    );
  });

  it('should dispatch proper action for refresh the client token', () => {
    store.dispatch(
      new ClientAuthActions.LoadClientTokenSuccess(mockClientToken)
    );

    spyOn(store, 'dispatch').and.stub();

    const sub = service.refreshClientToken().subscribe();
    sub.unsubscribe();

    expect(store.dispatch).toHaveBeenCalledWith(
      new ClientAuthActions.LoadClientToken()
    );
  });
});
