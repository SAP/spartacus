import { Observable } from 'rxjs';
import { AuthToken } from '../models/auth-token.model';
import { AuthStorageService } from './auth-storage.service';

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

    (service as any)._token$.next(authToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToken()', () => {
    it('should return observable', () => {
      expect(service.getToken()).toBeInstanceOf(Observable);
    });

    it('should return the token', (done: DoneFn) => {
      service.getToken().subscribe((token: AuthToken) => {
        expect(token).toEqual(authToken);

        done();
      });
    });
  });

  describe('setToken()', () => {
    it('should set a new token', (done: DoneFn) => {
      service.setToken(authToken);

      (service as any)._token$.asObservable().subscribe((token: AuthToken) => {
        expect(token).toEqual(authToken);

        done();
      });
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

  describe('removeItem()', () => {
    it('should not remove anything if wrong key passed', (done: DoneFn) => {
      service.removeItem('wrongKey');

      (service as any)._token$.asObservable().subscribe((token: AuthToken) => {
        expect(token).toEqual(authToken);

        done();
      });
    });

    it('should remove the item', (done: DoneFn) => {
      const key = 'access_token';

      service.removeItem(key);

      delete authToken[key];

      (service as any)._token$.asObservable().subscribe((token: AuthToken) => {
        expect(token).toEqual(authToken);

        done();
      });
    });
  });

  describe('setItem()', () => {
    it('should not set item if no key passed', (done: DoneFn) => {
      service.setItem(null, {});

      (service as any)._token$.asObservable().subscribe((token: AuthToken) => {
        expect(token).toEqual(authToken);

        done();
      });
    });

    it('should update existing item', (done: DoneFn) => {
      const newKey = 'access_token';
      const newValue = 'newAccessToken';

      service.setItem(newKey, newValue);

      const newAuthToken = {
        ...authToken,
        [newKey]: newValue,
      };

      (service as any)._token$.asObservable().subscribe((token: AuthToken) => {
        expect(token).toEqual(newAuthToken);

        done();
      });
    });

    it('should set a new item', (done: DoneFn) => {
      const newKey = 'newItem';
      const newValue = {};

      service.setItem(newKey, newValue);

      const newAuthToken = {
        ...authToken,
        [newKey]: newValue,
      };

      (service as any)._token$.asObservable().subscribe((token: AuthToken) => {
        expect(token).toEqual(newAuthToken);

        done();
      });
    });
  });
});
