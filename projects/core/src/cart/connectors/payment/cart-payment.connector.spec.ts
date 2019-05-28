import { TestBed } from '@angular/core/testing';
import { CartPaymentConnector } from './cart-payment.connector';
import { of } from 'rxjs';
import { CartPaymentAdapter } from './cart-payment.adapter';
import createSpy = jasmine.createSpy;

describe('CartPaymentConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  class MockCartPaymentAdapter implements CartPaymentAdapter {
    create = createSpy().and.returnValue(of({}));
    set = createSpy().and.returnValue(of({}));
    loadCardTypes = createSpy().and.returnValue(of([]));
  }

  let service: CartPaymentConnector;
  let adapter: CartPaymentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CartPaymentAdapter, useClass: MockCartPaymentAdapter },
      ],
    });

    service = TestBed.get(CartPaymentConnector);
    adapter = TestBed.get(CartPaymentAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should call adapter', () => {
    service.create('1', '2', {}).subscribe();
    expect(adapter.create).toHaveBeenCalledWith('1', '2', {});
  });

  it('set should call adapter', () => {
    service.set('1', '2', '3').subscribe();
    expect(adapter.set).toHaveBeenCalledWith('1', '2', '3');
  });

  it('getCardTypes should call adapter', () => {
    let result;
    service.getCardTypes().subscribe(res => (result = res));
    expect(result).toEqual([]);
    expect(adapter.loadCardTypes).toHaveBeenCalledWith();
  });
});
