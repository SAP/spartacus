import { take } from 'rxjs/operators';
import { AuthToken } from '../models/auth-token.model';
import { AuthStorageService } from './auth-storage.service';
import { firstValueFrom } from 'rxjs';

describe('AuthStorageService', () => {
  let service: AuthStorageService;
  let authToken: AuthToken;

  beforeEach(() => {
    service = new AuthStorageService();
    authToken = {
      access_token: 'accessToken',
      refresh_token: 'refreshToken',
      expires_at: 'expiresAt',
      granted_scopes: ['scope1', 'scope2'],
      access_token_stored_at: 'storedAt',
    };

    service.setToken(authToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToken()', () => {
    it('should return the token', async () => {
      const tokenValue = await firstValueFrom(service.getToken().pipe(take(1)));
      expect(tokenValue).toEqual(authToken);
    });
  });

  describe('setToken()', () => {
    it('should set a new token', async () => {
      const newAuthToken: AuthToken = {
        ...authToken,
        access_token: 'newAccessToken',
      };

      service.setToken(newAuthToken);

      const tokenValue = await firstValueFrom(service.getToken().pipe(take(1)));
      expect(tokenValue).toEqual(newAuthToken);
    });
  });

  describe('getItem()', () => {
    it('should not return anything if wrong key passed', () => {
      const value = service.getItem('wrongKey');

      expect(value).toBeUndefined();
    });

    it('should return the item', () => {
      const value = service.getItem('access_token');

      expect(value).toEqual(authToken.access_token);
    });
  });

  describe('removeItem()', async () => {
    it('should not remove anything if wrong key passed', async () => {
      service.removeItem('wrongKey');

      const value = await firstValueFrom(service.getToken().pipe(take(1)));

      expect(value).toEqual(authToken);
    });

    it('should remove the item', async () => {
      const key = 'access_token';
      const newAuthToken: AuthToken = {
        ...authToken,
      };
      delete newAuthToken[key];

      service.removeItem(key);

      const value = await firstValueFrom(service.getToken().pipe(take(1)));
      expect(value).toEqual(newAuthToken);
    });
  });

  describe('setItem()', () => {
    it('should not set item if no key passed', async () => {
      service.setItem(null, {});
      const value = await firstValueFrom(service.getToken().pipe(take(1)));

      expect(value).toEqual(authToken);
    });

    it('should update existing item', async () => {
      const newKey = 'access_token';
      const newValue = 'newAccessToken';

      service.setItem(newKey, newValue);

      const newAuthToken = {
        ...authToken,
        [newKey]: newValue,
      };

      const value = await firstValueFrom(service.getToken().pipe(take(1)));

      expect(value).toEqual(newAuthToken);
    });

    it('should set a new item', async () => {
      const newKey = 'newItem';
      const newValue = {};

      service.setItem(newKey, newValue);

      const newAuthToken = {
        ...authToken,
        [newKey]: newValue,
      };

      const value = await firstValueFrom(service.getToken().pipe(take(1)));
      expect(value).toEqual(newAuthToken);
    });
  });
});
