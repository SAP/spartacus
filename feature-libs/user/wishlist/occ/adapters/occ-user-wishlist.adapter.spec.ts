/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoggerService, OccEndpointsService } from '@spartacus/core';
import { Wishlist, WishlistEntry } from '@spartacus/user/wishlist/root';
import { OccUserWishlistAdapter } from './occ-user-wishlist.adapter';

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  buildUrl(
    endpoint: string,
    attributes?: { urlParams?: Record<string, string> }
  ): string {
    const p = (attributes?.urlParams ?? {}) as Record<string, string>;
    switch (endpoint) {
      case 'getUserWishlists':
        return `/users/${p['userId']}/wishlists`;
      case 'getWishlistEntries':
        return `/users/${p['userId']}/wishlists/${p['wishlistId']}/entries`;
      case 'addWishlistEntry':
        return `/users/${p['userId']}/wishlists/${p['wishlistId']}/entries`;
      case 'removeWishlistEntry':
        return `/users/${p['userId']}/wishlists/${p['wishlistId']}/entries/${p['entryId']}`;
      default:
        return `/${endpoint}`;
    }
  }
}

class MockLoggerService implements Partial<LoggerService> {
  warn(..._args: string[]): void {}
  error(..._args: string[]): void {}
  log(..._args: string[]): void {}
  debug(..._args: string[]): void {}
}

describe('OccUserWishlistAdapter', () => {
  let adapter: OccUserWishlistAdapter;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  const MOCK_USER_ID = 'testUser';
  const MOCK_WISHLIST_ID = 'wishlist-uuid-123';
  const MOCK_ENTRY_ID = 'entry-uuid-456';
  const MOCK_PRODUCT_CODE = '816802';

  const mockEntries: WishlistEntry[] = [
    {
      id: MOCK_ENTRY_ID,
      productCode: MOCK_PRODUCT_CODE,
      addedAt: '2024-01-01',
    },
  ];

  const mockCreatedEntry: WishlistEntry = {
    id: 'new-entry-uuid',
    productCode: MOCK_PRODUCT_CODE,
  };

  const LIST_URL = `/users/${MOCK_USER_ID}/wishlists`;
  const ENTRIES_URL = `/users/${MOCK_USER_ID}/wishlists/${MOCK_WISHLIST_ID}/entries`;
  const REMOVE_URL = `${ENTRIES_URL}/${MOCK_ENTRY_ID}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccUserWishlistAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccUserWishlistAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService);

    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getWishlist()', () => {
    describe('step 1: fetch wishlists list', () => {
      it('should build the getUserWishlists URL with userId', () => {
        adapter.getWishlist(MOCK_USER_ID).subscribe();

        httpMock
          .expectOne(LIST_URL)
          .flush({ wishlists: [{ id: MOCK_WISHLIST_ID }] });
        httpMock.expectOne(ENTRIES_URL).flush({ wishlistEntries: [] });

        expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
          'getUserWishlists',
          { urlParams: { userId: MOCK_USER_ID } }
        );
      });

      it('should send a GET request to the wishlists list URL', () => {
        adapter.getWishlist(MOCK_USER_ID).subscribe();

        const req = httpMock.expectOne(LIST_URL);
        expect(req.request.method).toBe('GET');
        req.flush({ wishlists: [{ id: MOCK_WISHLIST_ID }] });

        httpMock.expectOne(ENTRIES_URL).flush({ wishlistEntries: [] });
      });
    });

    describe('step 2: fetch entries', () => {
      it('should build the getWishlistEntries URL with userId and wishlistId from step 1', () => {
        adapter.getWishlist(MOCK_USER_ID).subscribe();

        httpMock
          .expectOne(LIST_URL)
          .flush({ wishlists: [{ id: MOCK_WISHLIST_ID }] });
        httpMock.expectOne(ENTRIES_URL).flush({ wishlistEntries: mockEntries });

        expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
          'getWishlistEntries',
          { urlParams: { userId: MOCK_USER_ID, wishlistId: MOCK_WISHLIST_ID } }
        );
      });

      it('should send a GET request to the entries URL', () => {
        adapter.getWishlist(MOCK_USER_ID).subscribe();

        httpMock
          .expectOne(LIST_URL)
          .flush({ wishlists: [{ id: MOCK_WISHLIST_ID }] });

        const req = httpMock.expectOne(ENTRIES_URL);
        expect(req.request.method).toBe('GET');
        req.flush({ wishlistEntries: mockEntries });
      });
    });

    describe('response shape normalisation', () => {
      it('should parse entries from { wishlistEntries: [...] } response', () => {
        let result: Wishlist | undefined;
        adapter.getWishlist(MOCK_USER_ID).subscribe((wl) => (result = wl));

        httpMock
          .expectOne(LIST_URL)
          .flush({ wishlists: [{ id: MOCK_WISHLIST_ID }] });
        httpMock.expectOne(ENTRIES_URL).flush({ wishlistEntries: mockEntries });

        expect(result).toEqual({ id: MOCK_WISHLIST_ID, entries: mockEntries });
      });

      it('should parse entries from a plain array response', () => {
        let result: Wishlist | undefined;
        adapter.getWishlist(MOCK_USER_ID).subscribe((wl) => (result = wl));

        httpMock
          .expectOne(LIST_URL)
          .flush({ wishlists: [{ id: MOCK_WISHLIST_ID }] });
        httpMock.expectOne(ENTRIES_URL).flush(mockEntries); // plain array

        expect(result).toEqual({ id: MOCK_WISHLIST_ID, entries: mockEntries });
      });

      it('should parse entries from { entries: [...] } fallback shape', () => {
        let result: Wishlist | undefined;
        adapter.getWishlist(MOCK_USER_ID).subscribe((wl) => (result = wl));

        httpMock
          .expectOne(LIST_URL)
          .flush({ wishlists: [{ id: MOCK_WISHLIST_ID }] });
        httpMock.expectOne(ENTRIES_URL).flush({ entries: mockEntries });

        expect(result).toEqual({ id: MOCK_WISHLIST_ID, entries: mockEntries });
      });
    });

    describe('edge cases: empty or absent wishlists', () => {
      it('should return { entries: [] } and skip step 2 when wishlists array is empty', () => {
        let result: Wishlist | undefined;
        adapter.getWishlist(MOCK_USER_ID).subscribe((wl) => (result = wl));

        httpMock.expectOne(LIST_URL).flush({ wishlists: [] });

        expect(result).toEqual({ entries: [] });
        // Step 2 must NOT fire
        httpMock.expectNone(ENTRIES_URL);
      });

      it('should return { entries: [] } and skip step 2 when wishlists field is absent', () => {
        let result: Wishlist | undefined;
        adapter.getWishlist(MOCK_USER_ID).subscribe((wl) => (result = wl));

        httpMock.expectOne(LIST_URL).flush({});

        expect(result).toEqual({ entries: [] });
        httpMock.expectNone(ENTRIES_URL);
      });

      it('should return empty entries array when step 2 returns no entries', () => {
        let result: Wishlist | undefined;
        adapter.getWishlist(MOCK_USER_ID).subscribe((wl) => (result = wl));

        httpMock
          .expectOne(LIST_URL)
          .flush({ wishlists: [{ id: MOCK_WISHLIST_ID }] });
        httpMock.expectOne(ENTRIES_URL).flush({ wishlistEntries: [] });

        expect(result!.entries).toEqual([]);
      });
    });

    describe('error handling', () => {
      it('should throw a normalized error when step 1 fails with HTTP 500', () => {
        let caughtError: any;
        adapter
          .getWishlist(MOCK_USER_ID)
          .subscribe({ error: (e) => (caughtError = e) });

        httpMock.expectOne(LIST_URL).flush('Internal Server Error', {
          status: 500,
          statusText: 'Server Error',
        });

        expect(caughtError).toBeDefined();
        expect(caughtError.status).toBe(500);
      });

      it('should throw a normalized error when step 2 fails with HTTP 404', () => {
        let caughtError: any;
        adapter
          .getWishlist(MOCK_USER_ID)
          .subscribe({ error: (e) => (caughtError = e) });

        httpMock
          .expectOne(LIST_URL)
          .flush({ wishlists: [{ id: MOCK_WISHLIST_ID }] });
        httpMock
          .expectOne(ENTRIES_URL)
          .flush('Not Found', { status: 404, statusText: 'Not Found' });

        expect(caughtError).toBeDefined();
        expect(caughtError.status).toBe(404);
      });
    });
  });

  describe('addEntry()', () => {
    it('should build the addWishlistEntry URL with userId and wishlistId', () => {
      adapter
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe();
      httpMock.expectOne(ENTRIES_URL).flush(mockCreatedEntry);

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'addWishlistEntry',
        {
          urlParams: { userId: MOCK_USER_ID, wishlistId: MOCK_WISHLIST_ID },
        }
      );
    });

    it('should send a POST request', () => {
      adapter
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe();

      const req = httpMock.expectOne(ENTRIES_URL);
      expect(req.request.method).toBe('POST');
      req.flush(mockCreatedEntry);
    });

    it('should send { productCode } as the request body', () => {
      adapter
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe();

      const req = httpMock.expectOne(ENTRIES_URL);
      expect(req.request.body).toEqual({ productCode: MOCK_PRODUCT_CODE });
      req.flush(mockCreatedEntry);
    });

    it('should emit the WishlistEntry returned by the API', () => {
      let result: WishlistEntry | undefined;
      adapter
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe((e) => (result = e));

      httpMock.expectOne(ENTRIES_URL).flush(mockCreatedEntry);

      expect(result).toEqual(mockCreatedEntry);
    });

    it('should throw a normalized error on HTTP 409 Conflict', () => {
      let caughtError: any;
      adapter
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe({ error: (e) => (caughtError = e) });

      httpMock
        .expectOne(ENTRIES_URL)
        .flush('Conflict', { status: 409, statusText: 'Conflict' });

      expect(caughtError).toBeDefined();
      expect(caughtError.status).toBe(409);
    });

    it('should throw a normalized error on HTTP 401 Unauthorized', () => {
      let caughtError: any;
      adapter
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe({ error: (e) => (caughtError = e) });

      httpMock
        .expectOne(ENTRIES_URL)
        .flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

      expect(caughtError).toBeDefined();
      expect(caughtError.status).toBe(401);
    });
  });

  describe('removeEntry()', () => {
    it('should build the removeWishlistEntry URL with userId, wishlistId, and entryId', () => {
      adapter
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe();
      httpMock.expectOne(REMOVE_URL).flush(null);

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'removeWishlistEntry',
        {
          urlParams: {
            userId: MOCK_USER_ID,
            wishlistId: MOCK_WISHLIST_ID,
            entryId: MOCK_ENTRY_ID,
          },
        }
      );
    });

    it('should send a DELETE request', () => {
      adapter
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe();

      const req = httpMock.expectOne(REMOVE_URL);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should send no request body', () => {
      adapter
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe();

      const req = httpMock.expectOne(REMOVE_URL);
      expect(req.request.body).toBeNull();
      req.flush(null);
    });

    it('should complete successfully on HTTP 204 No Content', () => {
      let completed = false;
      adapter
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe({ complete: () => (completed = true) });

      httpMock
        .expectOne(REMOVE_URL)
        .flush(null, { status: 204, statusText: 'No Content' });

      expect(completed).toBeTrue();
    });

    it('should throw a normalized error on HTTP 404 Not Found', () => {
      let caughtError: any;
      adapter
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe({ error: (e) => (caughtError = e) });

      httpMock
        .expectOne(REMOVE_URL)
        .flush('Not Found', { status: 404, statusText: 'Not Found' });

      expect(caughtError).toBeDefined();
      expect(caughtError.status).toBe(404);
    });

    it('should throw a normalized error on HTTP 403 Forbidden', () => {
      let caughtError: any;
      adapter
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe({ error: (e) => (caughtError = e) });

      httpMock
        .expectOne(REMOVE_URL)
        .flush('Forbidden', { status: 403, statusText: 'Forbidden' });

      expect(caughtError).toBeDefined();
      expect(caughtError.status).toBe(403);
    });
  });
});
