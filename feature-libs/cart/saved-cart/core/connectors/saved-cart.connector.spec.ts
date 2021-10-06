import { TestBed } from '@angular/core/testing';
import { Cart } from '@spartacus/core';
import { of } from 'rxjs';
import { SavedCartAdapter } from './saved-cart.adapter';
import { SavedCartConnector } from './saved-cart.connector';
import createSpy = jasmine.createSpy;

const mockCartId = 'test-cart';
const mockUserId = 'test-user';
const mockCartName = 'test-cart-name';
const mockCartDescription = 'test-cart-description';

const mockSavedCart: Cart = {
  name: 'test-cart-name',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  description: 'test-cart-description',
};

class MockSavedCartAdapter implements Partial<SavedCartAdapter> {
  load = createSpy().and.returnValue(of(mockSavedCart));
  loadList = createSpy().and.returnValue(of([mockSavedCart]));
  restoreSavedCart = createSpy().and.returnValue(of(mockSavedCart));
  saveCart = createSpy().and.returnValue(of(mockSavedCart));
  cloneSavedCart = createSpy().and.returnValue(of(mockSavedCart));
}

describe('SavedCartConnector', () => {
  let adapter: SavedCartAdapter;
  let connector: SavedCartConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SavedCartConnector,
        { provide: SavedCartAdapter, useClass: MockSavedCartAdapter },
      ],
    });

    connector = TestBed.inject(SavedCartConnector);
    adapter = TestBed.inject(SavedCartAdapter);
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should load saved cart', () => {
    connector.get(mockUserId, mockCartId);
    expect(adapter.load).toHaveBeenCalledWith(mockUserId, mockCartId);
  });

  it('should load saved carts', () => {
    connector.getList(mockUserId);
    expect(adapter.loadList).toHaveBeenCalledWith(mockUserId);
  });

  it('should restore saved cart', () => {
    connector.restoreSavedCart(mockUserId, mockCartId);
    expect(adapter.restoreSavedCart).toHaveBeenCalledWith(
      mockUserId,
      mockCartId
    );
  });

  it('should save or update a cart', () => {
    connector.saveCart(
      mockUserId,
      mockCartId,
      mockCartName,
      mockCartDescription
    );
    expect(adapter.saveCart).toHaveBeenCalledWith(
      mockUserId,
      mockCartId,
      mockCartName,
      mockCartDescription
    );
  });

  it('should clone saved cart', () => {
    connector.cloneSavedCart(mockUserId, mockCartId, mockCartName);
    expect(adapter.cloneSavedCart).toHaveBeenCalledWith(
      mockUserId,
      mockCartId,
      mockCartName
    );
  });
});
