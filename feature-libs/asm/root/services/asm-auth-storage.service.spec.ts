import { AuthToken } from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
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
    it('should return token target', async () => {
      const tokenTarget = await firstValueFrom(service.getTokenTarget());
      expect(tokenTarget).toEqual(TokenTarget.User);
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
    it('should set token target', async () => {
      service.setTokenTarget(TokenTarget.CSAgent);

      const tokenTarget = await firstValueFrom(service.getTokenTarget());
      expect(tokenTarget).toEqual(TokenTarget.CSAgent);
    });
  });

  describe('switchTokenTargetToCSAgent()', () => {
    it('should change target to CSAgent', async () => {
      service.switchTokenTargetToCSAgent();

      const tokenTarget = await firstValueFrom(service.getTokenTarget());
      expect(tokenTarget).toEqual(TokenTarget.CSAgent);
    });
  });

  describe('switchTokenTargetToUser()', () => {
    it('should change target to User', async () => {
      service.switchTokenTargetToCSAgent();
      service.switchTokenTargetToUser();

      const tokenTarget = await firstValueFrom(service.getTokenTarget());
      expect(tokenTarget).toEqual(TokenTarget.User);
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
