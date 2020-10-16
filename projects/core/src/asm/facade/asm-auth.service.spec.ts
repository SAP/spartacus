import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UserToken } from '../../auth/models/token-types.model';
import { AuthActions } from '../../auth/store/actions';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { AsmActions } from '../store/actions';
import { ASM_FEATURE, AsmState } from '../store/asm-state';
import * as fromReducers from '../store/reducers/index';
import { AsmAuthService } from './asm-auth.service';

const mockToken = {
  userId: 'user@sap.com',
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as UserToken;

describe('AsmAuthService', () => {
  let service: AsmAuthService;
  let store: Store<AsmState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromReducers.getReducers()),
      ],
    });

    service = TestBed.inject(AsmAuthService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the Customer Support Agent token', () => {
    store.dispatch(
      new AsmActions.LoadCustomerSupportAgentTokenSuccess(mockToken)
    );

    let result: UserToken;
    const subscription = service
      .getCustomerSupportAgentToken()
      .subscribe((token) => {
        result = token;
      });
    subscription.unsubscribe();

    expect(result).toEqual(mockToken);
  });

  it('should get the Customer Support Agent token loading status', () => {
    let result: boolean;
    service
      .getCustomerSupportAgentTokenLoading()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(false);
  });

  it('should dispatch proper action for authorizeCustomerSupporAgent', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorizeCustomerSupportAgent('user', 'password');
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.LoadCustomerSupportAgentToken({
        userId: 'user',
        password: 'password',
      })
    );
  });

  it('should dispatch proper action for logoutCustomerSupportAgent', () => {
    spyOn(store, 'dispatch').and.stub();
    spyOn(service, 'getCustomerSupportAgentToken').and.returnValue(
      of(mockToken)
    );
    service.logoutCustomerSupportAgent();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.LogoutCustomerSupportAgent()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.RevokeUserToken(mockToken)
    );
  });

  describe('isCustomerEmulationToken()', () => {
    const mockCustomerEmulationToken = {
      access_token: 'foo',
    } as UserToken;

    it('should return true if the userid is defined and not OCC_USER_ID_CURRENT', () => {
      expect(
        service.isCustomerEmulationToken({
          ...mockCustomerEmulationToken,
          userId: '1de31-d31d4-14d',
        })
      ).toBe(true);
    });

    it('should return false if there is no userId on the token', () => {
      expect(service.isCustomerEmulationToken(mockCustomerEmulationToken)).toBe(
        false
      );
    });

    it('should return false if there is no token', () => {
      expect(service.isCustomerEmulationToken(undefined)).toBe(false);
    });

    it('should return false if the token is an empty object', () => {
      expect(service.isCustomerEmulationToken({} as UserToken)).toBe(false);
    });

    it('should return false if the userid "current"', () => {
      expect(
        service.isCustomerEmulationToken({
          ...mockCustomerEmulationToken,
          userId: OCC_USER_ID_CURRENT,
        })
      ).toBe(false);
    });
  });
});
