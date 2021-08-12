import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  MultiCartService,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, of, ReplaySubject } from 'rxjs';
import { ProductsData } from '../../core/model';
import { ImportToCartService } from './import-to-cart.service';

import createSpy = jasmine.createSpy;

const mockUserId = 'test-user';
const mockCartId = '00004546';

const mockFileData: string[][] = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockSavedCart = { name: 'mockSavedCart', description: 'mock saved cart' };

const mockCartData: StateUtils.ProcessesLoaderState<Cart> = {
  value: { code: mockCartId },
};

const mockProductData: ProductsData = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockMultiCartService implements Partial<MultiCartService> {
  createCart = createSpy().and.returnValue(of(mockCartData));
  addEntries = createSpy();
}

class MockSavedCartService implements Partial<SavedCartService> {
  saveCart = createSpy();
  loadSavedCarts = createSpy();
  getSaveCartProcessLoading(): Observable<boolean> {
    return of();
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

describe('ImportToCartService', () => {
  let service: ImportToCartService;
  let multiCartService: MultiCartService;
  let savedCartService: SavedCartService;
  let mockActionsSubject: ReplaySubject<Action>;

  mockActionsSubject = new ReplaySubject<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImportToCartService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: MultiCartService, useClass: MockMultiCartService },
        { provide: SavedCartService, useClass: MockSavedCartService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });
    service = TestBed.inject(ImportToCartService);
    multiCartService = TestBed.inject(MultiCartService);
    savedCartService = TestBed.inject(SavedCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if data is parsable', () => {
    const result = service.isDataParsableToProducts(mockFileData);
    expect(result).toBe(true);
  });

  it('should return false if data is not parsable', () => {
    const result = service.isDataParsableToProducts([['abc', '11.22']]);
    expect(result).toBe(false);
  });

  it('should convert csv extracted data according to product and quantity', () => {
    expect(service['csvDataToProduct'](mockFileData)).toEqual(mockProductData);
  });

  describe('loadProductsToCart', () => {
    it('should create, save and load cart', () => {
      service.loadProductsToCart(mockProductData, mockSavedCart).subscribe();

      expect(multiCartService.createCart).toHaveBeenCalledWith({
        userId: mockUserId,
        extraData: { active: false },
      });
      expect(savedCartService.saveCart).toHaveBeenCalledWith({
        cartId: mockCartId,
        saveCartName: mockSavedCart.name,
        saveCartDescription: mockSavedCart.description,
      });
      expect(savedCartService.loadSavedCarts).toHaveBeenCalled();
      expect(multiCartService.addEntries).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockProductData
      );
    });
  });
});
