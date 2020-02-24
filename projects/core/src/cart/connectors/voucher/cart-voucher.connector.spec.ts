import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartVoucherAdapter } from './cart-voucher.adapter';
import { CartVoucherConnector } from './cart-voucher.connector';
import createSpy = jasmine.createSpy;

describe('CartVoucherConnector', () => {
  class MockCartVoucherAdapter implements CartVoucherAdapter {
    add = createSpy().and.returnValue(of({}));
    remove = createSpy().and.returnValue(of({}));
  }

  let service: CartVoucherConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CartVoucherAdapter, useClass: MockCartVoucherAdapter },
      ],
    });

    service = TestBed.inject(CartVoucherConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add should call adapter', () => {
    const adapter = TestBed.inject(CartVoucherAdapter);
    service.add('1', '2', '3').subscribe();
    expect(adapter.add).toHaveBeenCalledWith('1', '2', '3');
  });

  it('remove should call adapter', () => {
    const adapter = TestBed.inject(CartVoucherAdapter);
    service.remove('1', '2', '3').subscribe();
    expect(adapter.remove).toHaveBeenCalledWith('1', '2', '3');
  });
});
