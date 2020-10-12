import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { AsmActions } from '../store/actions';
import { AsmState, ASM_FEATURE } from '../store/asm-state';
import * as fromReducers from '../store/reducers/index';
import { CsAgentAuthService } from './csagent-auth.service';

class MockUserIdService {
  isCustomerEmulated() {}
  setUserId(_id: string) {}
}

// TODO(#8249): Fix unit tests after finalizing the service
describe('CsAgentAuthService', () => {
  let service: CsAgentAuthService;
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

    service = TestBed.inject(CsAgentAuthService);
    userIdService = TestBed.inject(UserIdService);
    // authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   new AsmActions.SetCSAgentTokenData({
    //     userId: 'user',
    //     password: 'password',
    //   })
    // );
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
    service.logoutCustomerSupportAgent();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.LogoutCustomerSupportAgent()
    );
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   new AuthActions.RevokeUserToken(mockToken)
    // );
  });

  it('isCustomerEmulated should return value from asmAuthStorageService.isEmulated', () => {
    const result = [];
    spyOn(userIdService, 'isEmulated').and.returnValue(of(true, false));
    service
      .isCustomerEmulated()
      .pipe(take(2))
      .subscribe((value) => result.push(value));
    expect(result).toEqual([true, false]);
  });
});
