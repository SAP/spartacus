/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import {
  FeatureToggles,
  OCC_USER_ID_ANONYMOUS,
  Product,
  ProductConnector,
  ProductScope,
  UserIdService,
} from '@spartacus/core';
import { UserWishlistConnector } from '@spartacus/user/wishlist/core';
import { Wishlist } from '@spartacus/user/wishlist/root';
import { Observable, of, throwError } from 'rxjs';
import { WishListService } from './wish-list.service';
import { WishListV2BridgeService } from './wish-list-v2-bridge.service';

describe('WishListV2BridgeService', () => {
  let service: WishListV2BridgeService;

  let mockFeatureToggles: { enableNewWishlistEndpoint: boolean };

  let v1Service: jasmine.SpyObj<WishListService>;
  let userIdService: jasmine.SpyObj<UserIdService>;
  let connector: jasmine.SpyObj<UserWishlistConnector>;
  let productConnector: jasmine.SpyObj<ProductConnector>;

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

  const mockV1Cart: Cart = {
    code: 'savedCart001',
    entries: [{ entryNumber: 0, product: { code: MOCK_PRODUCT_CODE } }],
  };

  beforeEach(() => {
    mockFeatureToggles = { enableNewWishlistEndpoint: false };

    v1Service = jasmine.createSpyObj<WishListService>('WishListService', [
      'createWishList',
      'loadWishList',
      'getWishList',
      'addEntry',
      'removeEntry',
      'getWishListLoading',
    ]);
    userIdService = jasmine.createSpyObj<UserIdService>('UserIdService', [
      'getUserId',
    ]);
    connector = jasmine.createSpyObj<UserWishlistConnector>(
      'UserWishlistConnector',
      ['getWishlist', 'addEntry', 'removeEntry']
    );
    productConnector = jasmine.createSpyObj<ProductConnector>(
      'ProductConnector',
      ['get']
    );

    v1Service.getWishList.and.returnValue(of(mockV1Cart));
    v1Service.getWishListLoading.and.returnValue(of(false));
    userIdService.getUserId.and.returnValue(of(MOCK_USER_ID));
    connector.getWishlist.and.returnValue(of(mockWishlist));
    connector.addEntry.and.returnValue(
      of({ id: 'new-entry', productCode: MOCK_PRODUCT_CODE })
    );
    connector.removeEntry.and.returnValue(of(undefined as void));
    productConnector.get.and.returnValue(of(mockProduct));

    TestBed.configureTestingModule({
      providers: [
        WishListV2BridgeService,
        { provide: FeatureToggles, useValue: mockFeatureToggles },
        { provide: WishListService, useValue: v1Service },
        { provide: UserIdService, useValue: userIdService },
        { provide: UserWishlistConnector, useValue: connector },
        { provide: ProductConnector, useValue: productConnector },
      ],
    });

    service = TestBed.inject(WishListV2BridgeService);
  });

  describe('when enableNewWishlistEndpoint is false (V1 / SavedCart mode)', () => {
    beforeEach(() => {
      mockFeatureToggles.enableNewWishlistEndpoint = false;
    });

    describe('createWishList()', () => {
      it('should delegate to v1Service with all arguments', () => {
        service.createWishList(MOCK_USER_ID, 'My List', 'description');
        expect(v1Service.createWishList).toHaveBeenCalledWith(
          MOCK_USER_ID,
          'My List',
          'description'
        );
      });
    });

    describe('loadWishList()', () => {
      it('should delegate to v1Service with userId and customerId', () => {
        service.loadWishList(MOCK_USER_ID, 'customer123');
        expect(v1Service.loadWishList).toHaveBeenCalledWith(
          MOCK_USER_ID,
          'customer123'
        );
      });
    });

    describe('getWishList()', () => {
      it('should delegate to v1Service', () => {
        service.getWishList().subscribe();
        expect(v1Service.getWishList).toHaveBeenCalled();
      });

      it('should emit an empty cart immediately before v1 stream emits (startWith guard)', () => {
        const emitted: Cart[] = [];
        service.getWishList().subscribe((cart) => emitted.push(cart));

        expect(emitted[0]).toEqual({ entries: [] } as Cart);
        expect(emitted[1]).toEqual(mockV1Cart);
      });

      it('should not call connector', () => {
        service.getWishList().subscribe();
        expect(connector.getWishlist).not.toHaveBeenCalled();
      });
    });

    describe('addEntry()', () => {
      it('should delegate to v1Service', () => {
        service.addEntry(MOCK_PRODUCT_CODE);
        expect(v1Service.addEntry).toHaveBeenCalledWith(MOCK_PRODUCT_CODE);
      });

      it('should not call connector.addEntry', () => {
        service.addEntry(MOCK_PRODUCT_CODE);
        expect(connector.addEntry).not.toHaveBeenCalled();
      });
    });

    describe('removeEntry()', () => {
      const mockEntry: OrderEntry = { entryNumber: 0 };

      it('should delegate to v1Service with the original entry', () => {
        service.removeEntry(mockEntry);
        expect(v1Service.removeEntry).toHaveBeenCalledWith(mockEntry);
      });

      it('should not call connector.removeEntry', () => {
        service.removeEntry(mockEntry);
        expect(connector.removeEntry).not.toHaveBeenCalled();
      });
    });

    describe('getWishListLoading()', () => {
      it('should return the stream from v1Service', () => {
        v1Service.getWishListLoading.and.returnValue(of(true));
        let result: boolean | undefined;
        service.getWishListLoading().subscribe((val) => (result = val));
        expect(result).toBeTrue();
        expect(v1Service.getWishListLoading).toHaveBeenCalled();
      });
    });
  });

  describe('when enableNewWishlistEndpoint is true (V2 / new Wishlist API mode)', () => {
    beforeEach(() => {
      mockFeatureToggles.enableNewWishlistEndpoint = true;
    });

    describe('createWishList()', () => {
      it('should be a no-op (backend creates wishlists automatically)', () => {
        service.createWishList(MOCK_USER_ID, 'My List');
        expect(v1Service.createWishList).not.toHaveBeenCalled();
      });
    });

    describe('loadWishList()', () => {
      it('should be a no-op (data is loaded lazily via getWishList)', () => {
        service.loadWishList(MOCK_USER_ID, 'customer123');
        expect(v1Service.loadWishList).not.toHaveBeenCalled();
      });
    });

    describe('getWishList()', () => {
      it('should call connector.getWishlist with the authenticated userId', () => {
        service.getWishList().subscribe();
        expect(connector.getWishlist).toHaveBeenCalledWith(MOCK_USER_ID);
      });

      it('should enrich each entry with product details using ProductScope.LIST', () => {
        service.getWishList().subscribe();
        expect(productConnector.get).toHaveBeenCalledWith(
          MOCK_PRODUCT_CODE,
          ProductScope.LIST
        );
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
        expect(entry.updateable).toBeTrue();
        expect(entry.quantity).toBe(1);
      });

      it('should handle multiple entries in parallel via forkJoin', () => {
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
        connector.getWishlist.and.returnValue(of(wishlistWithTwo));
        productConnector.get.and.callFake(
          (code: string): Observable<Product> =>
            of(code === MOCK_PRODUCT_CODE ? mockProduct : mockProduct2)
        );

        let cart: Cart | undefined;
        service.getWishList().subscribe((c) => (cart = c));

        expect(productConnector.get).toHaveBeenCalledTimes(2);
        expect(((cart as Cart).entries ?? []).length).toBe(2);
        expect((((cart as Cart).entries ?? [])[0] as any).product).toEqual(
          mockProduct
        );
        expect((((cart as Cart).entries ?? [])[1] as any).product).toEqual(
          mockProduct2
        );
      });

      it('should skip product fetch and return empty entries when wishlist has no entries', () => {
        connector.getWishlist.and.returnValue(
          of({ id: MOCK_WISHLIST_ID, entries: [] })
        );
        let cart: Cart | undefined;
        service.getWishList().subscribe((c) => (cart = c));

        expect(productConnector.get).not.toHaveBeenCalled();
        expect((cart as Cart).entries).toEqual([]);
      });

      it('should fall back to { code: productCode } when a product fetch fails', () => {
        productConnector.get.and.returnValue(
          throwError(() => new Error('404 Not Found'))
        );
        let cart: Cart | undefined;
        service.getWishList().subscribe((c) => (cart = c));

        const entry = ((cart as Cart).entries ?? [])[0] as any;
        expect(entry.product).toEqual({ code: MOCK_PRODUCT_CODE });
      });

      it('should emit an empty cart and recover when connector.getWishlist fails', () => {
        connector.getWishlist.and.returnValue(
          throwError(() => new Error('Network error'))
        );
        let cart: Cart | undefined;
        service.getWishList().subscribe((c) => (cart = c));

        expect((cart as Cart).entries).toEqual([]);
      });

      it('should not emit for anonymous users', () => {
        userIdService.getUserId.and.returnValue(of(OCC_USER_ID_ANONYMOUS));
        let emitted = false;
        service.getWishList().subscribe(() => (emitted = true));

        expect(emitted).toBeFalse();
        expect(connector.getWishlist).not.toHaveBeenCalled();
      });

      it('should not call v1Service', () => {
        service.getWishList().subscribe();
        expect(v1Service.getWishList).not.toHaveBeenCalled();
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

      it('should trigger refresh$.next() after successful add', () => {
        const refreshSpy = spyOn(
          (service as any).refresh$,
          'next'
        ).and.callThrough();
        service.addEntry(MOCK_PRODUCT_CODE);
        expect(refreshSpy).toHaveBeenCalled();
      });

      it('should not call v1Service.addEntry', () => {
        service.addEntry(MOCK_PRODUCT_CODE);
        expect(v1Service.addEntry).not.toHaveBeenCalled();
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
        const refreshSpy = spyOn(
          (service as any).refresh$,
          'next'
        ).and.callThrough();
        service.removeEntry(mockEntry);
        expect(refreshSpy).toHaveBeenCalled();
      });

      it('should not call v1Service.removeEntry', () => {
        service.removeEntry(mockEntry);
        expect(v1Service.removeEntry).not.toHaveBeenCalled();
      });
    });

    describe('getWishListLoading()', () => {
      it('should return of(false) without delegating to v1Service', () => {
        let result: boolean | undefined;
        service.getWishListLoading().subscribe((val) => (result = val));
        expect(result).toBeFalse();
        expect(v1Service.getWishListLoading).not.toHaveBeenCalled();
      });
    });
  });
});
