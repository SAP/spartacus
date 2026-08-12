import { TestBed } from '@angular/core/testing';
import { AuthToken, StatePersistenceService } from '@spartacus/core';
import { take, tap, toArray } from 'rxjs/operators';
import { firstValueFrom, lastValueFrom } from 'rxjs';
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

  describe('initial state from storage', () => {
    it('should restore token target and emulated user token from persisted asm state', async () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: StatePersistenceService,
            useValue: {
              readStateFromStorage: () => ({
                emulatedUserToken: authToken,
                tokenTarget: TokenTarget.CSAgent,
              }),
            },
          },
        ],
      });

      const initializedService = TestBed.inject(AsmAuthStorageService);

      expect(initializedService.getEmulatedUserToken()).toEqual(authToken);
      const tokenTarget = await firstValueFrom(
        initializedService.getTokenTarget()
      );
      expect(tokenTarget).toEqual(TokenTarget.CSAgent);
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

  describe('getEmulatedUserTokenState()', () => {
    it('should emit undefined without token set', async () => {
      const token = await firstValueFrom(service.getEmulatedUserTokenState());
      expect(token).toBeUndefined();
    });

    it('should emit emulated user token changes', async () => {
      const tokens$ = service
        .getEmulatedUserTokenState()
        .pipe(take(2), toArray());
      const tokensPromise = firstValueFrom(tokens$);
      service.setEmulatedUserToken(authToken);
      const tokens = await tokensPromise;
      expect(tokens).toEqual([undefined, authToken]);
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
