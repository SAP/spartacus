import { TestBed } from '@angular/core/testing';
import { UserTokenService } from './user-token.service';
import { OccUserService } from '../../newocc/user/user.service';
import { of } from 'rxjs/observable/of';
import { Token } from './../token-types';

let testToken: Token;
const testUsername = 'aName';

class MockOccUserService {
  loadToken(username: string, password: string) {}
}

fdescribe('UserTokenService', () => {
  let userTokenService;
  let userService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserTokenService,
        { provide: OccUserService, useClass: MockOccUserService }
      ]
    });

    userTokenService = TestBed.get(UserTokenService);
    userService = TestBed.get(OccUserService);
    testToken = {
      accessToken: 'xxx',
      tokenType: 'bearer',
      refreshToken: 'xxx',
      expiresIn: 1000,
      scope: ['xxx'],
      username: undefined
    };

    spyOn(userService, 'loadToken').and.returnValue(of(testToken));
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should load token', () => {
    spyOn(userTokenService, 'storeToken').and.callThrough();

    let result;
    userTokenService
      .loadToken(testUsername, 'doesNotMatter')
      .subscribe((token: Token) => (result = token));

    expect(result).toBeTruthy();

    testToken.username = testUsername;
    expect(result).toEqual(testToken);
    expect(userTokenService.storeToken).toHaveBeenCalled();
  });

  it('should return true when hasToken is called', () => {
    userTokenService.storeToken(testUsername, testToken);
    const hasToken = userTokenService.hasToken();
    expect(hasToken).toEqual(true);
  });

  it('should return a token when getStoreToken is called', () => {
    let result;
    userTokenService
      .loadToken(testUsername, 'doesNotMatter')
      .subscribe((token: Token) => (result = token));

    testToken.username = testUsername;
    expect(userTokenService.getToken()).toEqual(testToken);
  });
});
