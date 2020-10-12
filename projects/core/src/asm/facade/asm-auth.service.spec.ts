import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserIdService } from '../../auth/facade/user-id.service';
import { UserToken } from '../../auth/models/token-types.model';
import { AsmState, ASM_FEATURE } from '../store/asm-state';
import * as fromReducers from '../store/reducers/index';
import { AsmAuthService } from './asm-auth.service';

const mockToken = {
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as UserToken;

class MockUserIdService {
  isCustomerEmulated() {}
  setUserId(_id: string) {}
}

// TODO(#8249): Fix unit tests after finalizing the service
describe('AsmAuthService', () => {
  let service: AsmAuthService;
  let store: Store<AsmState>;
  let userIdService: UserIdService;
  // let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromReducers.getReducers()),
      ],
      providers: [{ provide: UserIdService, useClass: MockUserIdService }],
    });

    service = TestBed.inject(AsmAuthService);
    userIdService = TestBed.inject(UserIdService);
    // authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the Customer Support Agent token', () => {
    // store.dispatch(new AsmActions.SetCSAgentTokenData(mockToken));

    let result: UserToken;
    const subscription = service
      .getCustomerSupportAgentToken()
      .subscribe((token) => {
        result = token;
      });
    subscription.unsubscribe();

    expect(result).toEqual(mockToken);
  });

  // it('should get the Customer Support Agent token loading status', () => {
  //   let result: boolean;
  //   service
  //     .getCustomerSupportAgentTokenLoading()
  //     .subscribe((value) => (result = value))
  //     .unsubscribe();
  //   expect(result).toEqual(false);
  // });

  it('should dispatch proper action for authorizeCustomerSupportAgent', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorizeCustomerSupportAgent('user', 'password');
    expect(store.dispatch)
      .toHaveBeenCalledWith
      // new AsmActions.SetCSAgentTokenData({
      //   userId: 'user',
      //   password: 'password',
      // })
      ();
  });

  it('should set userId and tokens when starting emulation', () => {
    // spyOn(authService, 'authorizeWithToken').and.stub();
    spyOn(userIdService, 'setUserId').and.stub();

    // service.startCustomerEmulationSession(
    //   { access_token: 'atoken' } as UserToken,
    //   'customerId123'
    // );

    // expect(authService.authorizeWithToken).toHaveBeenCalledWith({
    //   access_token: 'atoken',
    // } as UserToken);
    expect(userIdService.setUserId).toHaveBeenCalledWith('customerId123');
  });

  it('should dispatch proper action for logoutCustomerSupportAgent', () => {
    spyOn(store, 'dispatch').and.stub();
    spyOn(service, 'getCustomerSupportAgentToken').and.returnValue(
      of(mockToken)
    );
    service.logoutCustomerSupportAgent();
    expect(store.dispatch)
      .toHaveBeenCalledWith
      // new AsmActions.LogoutCustomerSupportAgent()
      ();
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   new AuthActions.RevokeUserToken(mockToken)
    // );
  });

  it('isCustomerEmulated should return value from userIdService.isCustomerEmulated', () => {
    const result = [];
    spyOn(userIdService, 'isCustomerEmulated').and.returnValue(of(true, false));
    service
      .isCustomerEmulated()
      .pipe(take(2))
      .subscribe((value) => result.push(value));
    expect(result).toEqual([true, false]);
  });
});
