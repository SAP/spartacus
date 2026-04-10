/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, of } from 'rxjs';
import { Wishlist, WishlistEntry } from '@spartacus/user/wishlist/root';
import { UserWishlistAdapter } from './user-wishlist.adapter';

/**
 * Concrete stub that fulfils the abstract class contract.
 * Each method is individually spied on in tests.
 */
class MockUserWishlistAdapter extends UserWishlistAdapter {
  getWishlist(_userId: string): Observable<Wishlist> {
    return of({ id: 'mock-id', entries: [] });
  }

  addEntry(
    _userId: string,
    _wishlistId: string,
    _productCode: string
  ): Observable<WishlistEntry> {
    return of({ id: 'entry-1', productCode: 'MOCK_CODE' });
  }

  removeEntry(
    _userId: string,
    _wishlistId: string,
    _entryId: string
  ): Observable<void> {
    return of(undefined as void);
  }
}

describe('UserWishlistAdapter', () => {
  let adapter: UserWishlistAdapter;

  const MOCK_USER_ID = 'user-001';
  const MOCK_WISHLIST_ID = 'wishlist-uuid-123';
  const MOCK_ENTRY_ID = 'entry-uuid-456';
  const MOCK_PRODUCT_CODE = '816802';

  const mockWishlist: Wishlist = {
    id: MOCK_WISHLIST_ID,
    entries: [{ id: MOCK_ENTRY_ID, productCode: MOCK_PRODUCT_CODE }],
  };

  const mockEntry: WishlistEntry = {
    id: MOCK_ENTRY_ID,
    productCode: MOCK_PRODUCT_CODE,
  };

  beforeEach(() => {
    adapter = new MockUserWishlistAdapter();
  });

  describe('contract: abstract class can be extended with a concrete implementation', () => {
    it('should instantiate a concrete subclass without errors', () => {
      expect(adapter).toBeTruthy();
      expect(adapter instanceof UserWishlistAdapter).toBeTrue();
    });
  });

  describe('getWishlist()', () => {
    it('should define the getWishlist abstract method', () => {
      expect(typeof adapter.getWishlist).toBe('function');
    });

    it('should accept userId and return an Observable<Wishlist>', () => {
      spyOn(adapter, 'getWishlist').and.returnValue(of(mockWishlist));

      let result: Wishlist | undefined;
      adapter.getWishlist(MOCK_USER_ID).subscribe((wl) => (result = wl));

      expect(adapter.getWishlist).toHaveBeenCalledWith(MOCK_USER_ID);
      expect(result).toEqual(mockWishlist);
    });

    it('should forward the userId argument to the implementation', () => {
      const spy = spyOn(adapter, 'getWishlist').and.callThrough();
      adapter.getWishlist(MOCK_USER_ID).subscribe();
      expect(spy).toHaveBeenCalledWith(MOCK_USER_ID);
    });
  });

  describe('addEntry()', () => {
    it('should define the addEntry abstract method', () => {
      expect(typeof adapter.addEntry).toBe('function');
    });

    it('should accept userId, wishlistId, productCode and return Observable<WishlistEntry>', () => {
      spyOn(adapter, 'addEntry').and.returnValue(of(mockEntry));

      let result: WishlistEntry | undefined;
      adapter
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe((e) => (result = e));

      expect(adapter.addEntry).toHaveBeenCalledWith(
        MOCK_USER_ID,
        MOCK_WISHLIST_ID,
        MOCK_PRODUCT_CODE
      );
      expect(result).toEqual(mockEntry);
    });

    it('should forward all three arguments to the implementation', () => {
      const spy = spyOn(adapter, 'addEntry').and.callThrough();
      adapter
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe();
      expect(spy).toHaveBeenCalledWith(
        MOCK_USER_ID,
        MOCK_WISHLIST_ID,
        MOCK_PRODUCT_CODE
      );
    });
  });

  describe('removeEntry()', () => {
    it('should define the removeEntry abstract method', () => {
      expect(typeof adapter.removeEntry).toBe('function');
    });

    it('should accept userId, wishlistId, entryId and return Observable<void>', () => {
      spyOn(adapter, 'removeEntry').and.returnValue(of(undefined as void));

      let called = false;
      adapter
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe(() => (called = true));

      expect(adapter.removeEntry).toHaveBeenCalledWith(
        MOCK_USER_ID,
        MOCK_WISHLIST_ID,
        MOCK_ENTRY_ID
      );
      expect(called).toBeTrue();
    });

    it('should forward all three arguments to the implementation', () => {
      const spy = spyOn(adapter, 'removeEntry').and.callThrough();
      adapter
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe();
      expect(spy).toHaveBeenCalledWith(
        MOCK_USER_ID,
        MOCK_WISHLIST_ID,
        MOCK_ENTRY_ID
      );
    });
  });
});
