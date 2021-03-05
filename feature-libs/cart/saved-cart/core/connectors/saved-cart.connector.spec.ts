import { TestBed } from '@angular/core/testing';
import { Cart } from '@spartacus/core';
import { of } from 'rxjs';
import { SavedCartAdapter } from './saved-cart.adapter';
import { SavedCartConnector } from './saved-cart.connector';

import createSpy = jasmine.createSpy;

const userId = 'currentUserId';
const cartDescription = 'testCartDescription';
const cartId = '123456789';
const cartName = 'testCartName';

const cart: Cart = {};

class MockSavedCartAdapter implements Partial<SavedCartAdapter> {
  load = createSpy('SavedCartAdapter.load').and.returnValue(of(cart));
  loadList = createSpy('SavedCartAdapter.loadList').and.returnValue(of([cart]));
  restoreSavedCart = createSpy(
    'SavedCartAdapter.restoreSavedCart'
  ).and.returnValue(of(cart));
  saveCart = createSpy('SavedCartAdapter.saveCart').and.returnValue(of(cart));
}

describe('SavedCartConnector', () => {
  let connector: SavedCartConnector;
  let adapter: SavedCartAdapter;

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
    connector.get(userId, cartId);
    expect(adapter.load).toHaveBeenCalledWith(userId, cartId);
  });

  it('should load saved carts', () => {
    connector.getList(userId);
    expect(adapter.loadList).toHaveBeenCalledWith(userId);
  });

  it('should restore save cart', () => {
    connector.restoreSavedCart(userId, cartId);
    expect(adapter.restoreSavedCart).toHaveBeenCalledWith(userId, cartId);
  });

  it('should save cart', () => {
    connector.saveCart(userId, cartId, cartDescription, cartName);
    expect(adapter.saveCart).toHaveBeenCalledWith(
      userId,
      cartId,
      cartDescription,
      cartName
    );
  });
});
