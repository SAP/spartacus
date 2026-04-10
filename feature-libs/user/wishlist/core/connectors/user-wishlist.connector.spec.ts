/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Wishlist, WishlistEntry } from '@spartacus/user/wishlist/root';
import { UserWishlistAdapter } from './user-wishlist.adapter';
import { UserWishlistConnector } from './user-wishlist.connector';

describe('UserWishlistConnector', () => {
  let connector: UserWishlistConnector;
  let adapter: jasmine.SpyObj<UserWishlistAdapter>;

  const MOCK_USER_ID = 'user-001';
  const MOCK_WISHLIST_ID = 'wishlist-uuid-123';
  const MOCK_ENTRY_ID = 'entry-uuid-456';
  const MOCK_PRODUCT_CODE = '816802';

  const mockWishlist: Wishlist = {
    id: MOCK_WISHLIST_ID,
    entries: [
      {
        id: MOCK_ENTRY_ID,
        productCode: MOCK_PRODUCT_CODE,
        addedAt: '2024-01-01',
      },
    ],
  };

  const mockEntry: WishlistEntry = {
    id: MOCK_ENTRY_ID,
    productCode: MOCK_PRODUCT_CODE,
  };

  beforeEach(() => {
    adapter = jasmine.createSpyObj<UserWishlistAdapter>('UserWishlistAdapter', [
      'getWishlist',
      'addEntry',
      'removeEntry',
    ]);

    adapter.getWishlist.and.returnValue(of(mockWishlist));
    adapter.addEntry.and.returnValue(of(mockEntry));
    adapter.removeEntry.and.returnValue(of(undefined as void));

    TestBed.configureTestingModule({
      providers: [
        UserWishlistConnector,
        { provide: UserWishlistAdapter, useValue: adapter },
      ],
    });

    connector = TestBed.inject(UserWishlistConnector);
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  describe('getWishlist()', () => {
    it('should delegate to adapter.getWishlist with the given userId', () => {
      connector.getWishlist(MOCK_USER_ID).subscribe();
      expect(adapter.getWishlist).toHaveBeenCalledWith(MOCK_USER_ID);
      expect(adapter.getWishlist).toHaveBeenCalledTimes(1);
    });

    it('should return the Observable emitted by the adapter', () => {
      let result: Wishlist | undefined;
      connector.getWishlist(MOCK_USER_ID).subscribe((wl) => (result = wl));
      expect(result).toEqual(mockWishlist);
    });

    it('should not call addEntry or removeEntry', () => {
      connector.getWishlist(MOCK_USER_ID).subscribe();
      expect(adapter.addEntry).not.toHaveBeenCalled();
      expect(adapter.removeEntry).not.toHaveBeenCalled();
    });
  });

  describe('addEntry()', () => {
    it('should delegate to adapter.addEntry with userId, wishlistId, and productCode', () => {
      connector
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe();
      expect(adapter.addEntry).toHaveBeenCalledWith(
        MOCK_USER_ID,
        MOCK_WISHLIST_ID,
        MOCK_PRODUCT_CODE
      );
      expect(adapter.addEntry).toHaveBeenCalledTimes(1);
    });

    it('should return the Observable<WishlistEntry> emitted by the adapter', () => {
      let result: WishlistEntry | undefined;
      connector
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe((e) => (result = e));
      expect(result).toEqual(mockEntry);
    });

    it('should not call getWishlist or removeEntry', () => {
      connector
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe();
      expect(adapter.getWishlist).not.toHaveBeenCalled();
      expect(adapter.removeEntry).not.toHaveBeenCalled();
    });
  });

  describe('removeEntry()', () => {
    it('should delegate to adapter.removeEntry with userId, wishlistId, and entryId', () => {
      connector
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe();
      expect(adapter.removeEntry).toHaveBeenCalledWith(
        MOCK_USER_ID,
        MOCK_WISHLIST_ID,
        MOCK_ENTRY_ID
      );
      expect(adapter.removeEntry).toHaveBeenCalledTimes(1);
    });

    it('should return the Observable<void> emitted by the adapter', () => {
      let completed = false;
      connector
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe({ complete: () => (completed = true) });
      expect(completed).toBeTrue();
    });

    it('should not call getWishlist or addEntry', () => {
      connector
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe();
      expect(adapter.getWishlist).not.toHaveBeenCalled();
      expect(adapter.addEntry).not.toHaveBeenCalled();
    });
  });

  describe('method isolation', () => {
    it('calling all three methods should invoke each adapter method exactly once', () => {
      connector.getWishlist(MOCK_USER_ID).subscribe();
      connector
        .addEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_PRODUCT_CODE)
        .subscribe();
      connector
        .removeEntry(MOCK_USER_ID, MOCK_WISHLIST_ID, MOCK_ENTRY_ID)
        .subscribe();

      expect(adapter.getWishlist).toHaveBeenCalledTimes(1);
      expect(adapter.addEntry).toHaveBeenCalledTimes(1);
      expect(adapter.removeEntry).toHaveBeenCalledTimes(1);
    });
  });
});
