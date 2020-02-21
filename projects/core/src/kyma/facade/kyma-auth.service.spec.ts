import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OpenIdToken } from '../models/kyma-token-types.model';
import { KymaActions } from '../store/actions/index';
import * as fromKymaStore from '../store/index';
import { KYMA_FEATURE, KymaState } from '../store/kyma-state';
import { KymaService } from './kyma.service';

const mockOpenIdToken = {
  access_token: 'testOpenIdToken',
} as OpenIdToken;

describe('KymaService', () => {
  let service: KymaService;
  let store: Store<KymaState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(KYMA_FEATURE, fromKymaStore.getReducers()),
      ],
      providers: [KymaService],
    });

    service = TestBed.inject(KymaService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authorizeOpenId', () => {
    it('should dispatch an action', () => {
      spyOn(store, 'dispatch').and.stub();

      const username = 'xxx@xxx.xxx';
      const password = 'pwd';
      service.authorizeOpenId(username, password);
      expect(store.dispatch).toHaveBeenCalledWith(
        new KymaActions.LoadOpenIdToken({ username, password })
      );
    });
  });

  describe('getOpenIdToken', () => {
    it('should select the open ID token from the store', () => {
      store.dispatch(new KymaActions.LoadOpenIdTokenSuccess(mockOpenIdToken));

      let result: OpenIdToken;
      service
        .getOpenIdToken()
        .subscribe(token => (result = token))
        .unsubscribe();
      expect(result).toEqual(mockOpenIdToken);
    });
  });
});
