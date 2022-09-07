import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartEntryAdapter } from './cart-entry.adapter';
import { CartEntryConnector } from './cart-entry.connector';
import createSpy = jasmine.createSpy;

describe('CartEntryConnector', () => {
  class MockCartEntryAdapter implements CartEntryAdapter {
    add = createSpy().and.returnValue(of({}));
    update = createSpy().and.returnValue(of({}));
    remove = createSpy().and.returnValue(of({}));
  }

  let service: CartEntryConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CartEntryAdapter, useClass: MockCartEntryAdapter },
      ],
    });

    service = TestBed.inject(CartEntryConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add should call adapter', () => {
    const userId = '1';
    const cartId = '2';
    const productCode = '3';

    const adapter = TestBed.inject(CartEntryAdapter);
    service.add({ userId, cartId, productCode }).subscribe();
    expect(adapter.add).toHaveBeenCalledWith({
      userId,
      cartId,
      productCode,
    });
  });

  it('update should call adapter', () => {
    const userId = '1';
    const cartId = '2';
    const entryNumber = 3;
    const quantity = 4;

    const adapter = TestBed.inject(CartEntryAdapter);
    service.update({ userId, cartId, entryNumber, quantity }).subscribe();
    expect(adapter.update).toHaveBeenCalledWith({
      userId,
      cartId,
      entryNumber,
      quantity,
    });
  });

  it('remove should call adapter', () => {
    const userId = '1';
    const cartId = '2';
    const entryNumber = 3;

    const adapter = TestBed.inject(CartEntryAdapter);
    service.remove({ userId, cartId, entryNumber }).subscribe();
    expect(adapter.remove).toHaveBeenCalledWith({
      userId,
      cartId,
      entryNumber,
    });
  });
});
