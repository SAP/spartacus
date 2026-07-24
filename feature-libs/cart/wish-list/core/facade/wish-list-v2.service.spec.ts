/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import {
  OCC_USER_ID_ANONYMOUS,
  Product,
  ProductSearchConnector,
  UserIdService,
} from '@spartacus/core';
import { UserWishlistConnector } from '@spartacus/user/wishlist/core';
import { Wishlist } from '@spartacus/user/wishlist/root';
import { of, throwError } from 'rxjs';
import { WishListV2Service } from './wish-list-v2.service';

describe('WishListV2Service', () => {
  let service: WishListV2Service;

  let userIdService: vi.MockObj<UserIdService>;
  let connector: vi.MockObj<UserWishlistConnector>;
  let productSearchConnector: vi.MockObj<ProductSearchConnector>;

  const MOCK_USER_ID = 'testUser';
  const MOCK_WISHLIST_ID = 'wishlist-uuid-123';
  const MOCK_ENTRY_ID = 'entry-uuid-456';
  const MOCK_PRODUCT_CODE = '816802';

  const mockProduct: Product = {
    code: MOCK_PRODUCT_CODE,
    name: 'Camera DSC-N1',
    price: { formattedValue: '$199.00', value: 199, currencyIso: 'USD' },
    slug: 'camera-dsc-n1',
    images: { PRIMARY: { thumbnail: { url: '/img/dsc-n1.jpg' } } } as any,
  };

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

  beforeEach(() => {
    userIdService = { getUserId: vi.fn() } as any;
    connector = { getWishlist: vi.fn(), addEntry: vi.fn(), removeEntry: vi.fn() } as any;
    productSearchConnector = { searchByCodes: vi.fn() } as any;

    userIdService.getUserId.mockReturnValue(of(MOCK_USER_ID));
    connector.getWishlist.mockReturnValue(of(mockWishlist));
    connector.addEntry.mockReturnValue(
      of({ id: 'new-entry', productCode: MOCK_PRODUCT_CODE })
    );
    connector.removeEntry.mockReturnValue(of(undefined as void));
    productSearchConnector.searchByCodes.mockReturnValue(
      of({ products: [mockProduct] })
    );

    TestBed.configureTestingModule({
      providers: [
        WishListV2Service,
        { provide: UserIdService, useValue: userIdService },
        { provide: UserWishlistConnector, useValue: connector },
        { provide: ProductSearchConnector, useValue: productSearchConnector },
      ],
    });

    service = TestBed.inject(WishListV2Service);
  });

  describe('createWishList()', () => {
    it('should be a no-op (backend creates wishlists automatically)', () => {
      expect(() =>
        service.createWishList(MOCK_USER_ID, 'My List')
      ).not.toThrow();
    });
  });

  describe('loadWishList()', () => {
    it('should be a no-op (data is loaded lazily via getWishList)', () => {
      expect(() =>
        service.loadWishList(MOCK_USER_ID, 'customer123')
      ).not.toThrow();
    });
  });

  describe('getWishList()', () => {
    it('should call connector.getWishlist with the authenticated userId', () => {
      service.getWishList().subscribe();
      expect(connector.getWishlist).toHaveBeenCalledWith(MOCK_USER_ID);
    });

    it('should enrich entries with product details via a single searchByCodes call', () => {
      service.getWishList().subscribe();
      expect(productSearchConnector.searchByCodes).toHaveBeenCalledTimes(1);
      expect(productSearchConnector.searchByCodes).toHaveBeenCalledWith([
        MOCK_PRODUCT_CODE,
      ]);
    });

    it('should map wishlist to Cart with correct per-entry structure', () => {
      let cart: Cart | undefined;
      service.getWishList().subscribe((c) => (cart = c));

      expect((cart as Cart).code).toBe(MOCK_WISHLIST_ID);
      expect(((cart as Cart).entries ?? []).length).toBe(1);

      const entry = ((cart as Cart).entries ?? [])[0] as any;
      expect(entry.entryNumber).toBe(0);
      expect(entry.wishlistEntryId).toBe(MOCK_ENTRY_ID);
      expect(entry.product).toEqual(mockProduct);
      expect(entry.basePrice).toEqual(mockProduct.price);
      expect(entry.updateable).toBe(true);
      expect(entry.quantity).toBe(1);
    });

    it('should batch-fetch all products in one searchByCodes call', () => {
      const mockProduct2: Product = {
        code: '999999',
        name: 'Tripod T-500',
        price: { formattedValue: '$49.00' },
      };
      const wishlistWithTwo: Wishlist = {
        id: MOCK_WISHLIST_ID,
        entries: [
          { id: MOCK_ENTRY_ID, productCode: MOCK_PRODUCT_CODE },
          { id: 'entry-uuid-789', productCode: '999999' },
        ],
      };
      connector.getWishlist.mockReturnValue(of(wishlistWithTwo));
      productSearchConnector.searchByCodes.mockReturnValue(
        of({ products: [mockProduct, mockProduct2] })
      );

      let cart: Cart | undefined;
      service.getWishList().subscribe((c) => (cart = c));

      expect(productSearchConnector.searchByCodes).toHaveBeenCalledTimes(1);
      expect(productSearchConnector.searchByCodes).toHaveBeenCalledWith([
        MOCK_PRODUCT_CODE,
        '999999',
      ]);
      expect(((cart as Cart).entries ?? []).length).toBe(2);
      expect((((cart as Cart).entries ?? [])[0] as any).product).toEqual(
        mockProduct
      );
      expect((((cart as Cart).entries ?? [])[1] as any).product).toEqual(
        mockProduct2
      );
    });

    it('should skip product fetch and return empty entries when wishlist has no entries', () => {
      connector.getWishlist.mockReturnValue(
        of({ id: MOCK_WISHLIST_ID, entries: [] })
      );
      let cart: Cart | undefined;
      service.getWishList().subscribe((c) => (cart = c));

      expect(productSearchConnector.searchByCodes).not.toHaveBeenCalled();
      expect((cart as Cart).entries).toEqual([]);
    });

    it('should fall back to original wishlist entries when searchByCodes fails', () => {
      productSearchConnector.searchByCodes.mockReturnValue(
        throwError(() => new Error('Search API error'))
      );
      let cart: Cart | undefined;
      service.getWishList().subscribe((c) => (cart = c));

      const entry = ((cart as Cart).entries ?? [])[0] as any;
      expect(entry.product).toEqual({ code: MOCK_PRODUCT_CODE });
    });

    it('should emit an empty cart and recover when connector.getWishlist fails', () => {
      connector.getWishlist.mockReturnValue(
        throwError(() => new Error('Network error'))
      );
      let cart: Cart | undefined;
      service.getWishList().subscribe((c) => (cart = c));

      expect((cart as Cart).entries).toEqual([]);
    });

    it('should not emit for anonymous users', () => {
      userIdService.getUserId.mockReturnValue(of(OCC_USER_ID_ANONYMOUS));
      let emitted = false;
      service.getWishList().subscribe(() => (emitted = true));

      expect(emitted).toBe(false);
      expect(connector.getWishlist).not.toHaveBeenCalled();
    });

    describe('wishlistV2$ memoization', () => {
      it('should return the same observable instance on every access (??= lazy init)', () => {
        const obs1 = (service as any).wishlistV2$;
        const obs2 = (service as any).wishlistV2$;
        expect(obs1).toBe(obs2);
      });
    });
  });

  describe('addEntry()', () => {
    it('should call connector.addEntry with userId, wishlistId, and productCode', () => {
      service.addEntry(MOCK_PRODUCT_CODE);
      expect(connector.addEntry).toHaveBeenCalledWith(
        MOCK_USER_ID,
        MOCK_WISHLIST_ID,
        MOCK_PRODUCT_CODE
      );
    });

    it('should use "default" as wishlistId when wishlist has no id', () => {
      connector.getWishlist.mockReturnValue(of({ entries: [] }));
      service.addEntry(MOCK_PRODUCT_CODE);
      expect(connector.addEntry).toHaveBeenCalledWith(
        MOCK_USER_ID,
        'default',
        MOCK_PRODUCT_CODE
      );
    });

    it('should trigger refresh$.next() after successful add', () => {
      const refreshSpy = vi.spyOn(
        (service as any).refresh$,
        'next'
      );
      service.addEntry(MOCK_PRODUCT_CODE);
      expect(refreshSpy).toHaveBeenCalled();
    });
  });

  describe('removeEntry()', () => {
    const mockEntry = {
      entryNumber: 0,
      wishlistEntryId: MOCK_ENTRY_ID,
    } as any as OrderEntry;

    it('should call connector.removeEntry with userId, wishlistId, and wishlistEntryId', () => {
      service.removeEntry(mockEntry);
      expect(connector.removeEntry).toHaveBeenCalledWith(
        MOCK_USER_ID,
        MOCK_WISHLIST_ID,
        MOCK_ENTRY_ID
      );
    });

    it('should trigger refresh$.next() after successful remove', () => {
      const refreshSpy = vi.spyOn(
        (service as any).refresh$,
        'next'
      );
      service.removeEntry(mockEntry);
      expect(refreshSpy).toHaveBeenCalled();
    });
  });

  describe('getWishListLoading()', () => {
    it('should return of(false)', () => {
      let result: boolean | undefined;
      service.getWishListLoading().subscribe((val) => (result = val));
      expect(result).toBe(false);
    });
  });
});
