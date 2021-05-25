import { AuthToken } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';

describe('AsmAuthStorageService', () => {
  let service: AsmAuthStorageService;

  const authToken: AuthToken = {
    access_token: 'accessToken',
    refresh_token: 'refreshToken',
    expires_at: 'expiresAt',
    granted_scopes: ['scope1', 'scope2'],
    access_token_stored_at: 'storedAt',
  };

  beforeEach(() => {
    service = new AsmAuthStorageService();
    service.setTokenTarget(TokenTarget.User);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTokenTarget()', () => {
    it('should return token target', (done: DoneFn) => {
      service
        .getTokenTarget()
        .pipe(take(1))
        .subscribe((tokenTarget) => {
          expect(tokenTarget).toEqual(TokenTarget.User);

          done();
        });
    });
  });

  describe('getEmulatedUserToken()', () => {
    it('should return undefined without token set', () => {
      const token: AuthToken = service.getEmulatedUserToken();

      expect(token).toBeUndefined();
    });

    it('should return emulated user token', () => {
      service.setEmulatedUserToken(authToken);

      const token: AuthToken = service.getEmulatedUserToken();

      expect(token).toEqual(authToken);
    });
  });

  describe('setEmulatedUserToken()', () => {
    it('should set emulated user token', () => {
      service.setEmulatedUserToken(authToken);

      const token: AuthToken = service.getEmulatedUserToken();

      expect(token).toEqual(authToken);
    });
  });

  describe('setTokenTarget()', () => {
    it('should set token target', (done: DoneFn) => {
      service.setTokenTarget(TokenTarget.CSAgent);

      service
        .getTokenTarget()
        .pipe(take(1))
        .subscribe((tokenTarget) => {
          expect(tokenTarget).toEqual(TokenTarget.CSAgent);

          done();
        });
    });
  });

  describe('switchTokenTargetToCSAgent()', () => {
    it('should change target to CSAgent', (done: DoneFn) => {
      service.switchTokenTargetToCSAgent();

      service
        .getTokenTarget()
        .pipe(take(1))
        .subscribe((tokenTarget) => {
          expect(tokenTarget).toEqual(TokenTarget.CSAgent);

          done();
        });
    });
  });

  describe('switchTokenTargetToUser()', () => {
    it('should change target to User', (done: DoneFn) => {
      service.switchTokenTargetToCSAgent();
      service.switchTokenTargetToUser();

      service
        .getTokenTarget()
        .pipe(take(1))
        .subscribe((tokenTarget) => {
          expect(tokenTarget).toEqual(TokenTarget.User);

          done();
        });
    });
  });

  describe('clearEmulatedUserToken()', () => {
    it('should clear emulated user token', () => {
      service.clearEmulatedUserToken();

      const token: AuthToken = service.getEmulatedUserToken();

      expect(token).toBeUndefined();
    });
  });
});
