import { TestBed } from '@angular/core/testing';
import { CartPaymentConnector } from './cart-payment.connector';
import { of } from 'rxjs';
import { CartPaymentAdapter } from './cart-payment.adapter';
import createSpy = jasmine.createSpy;

describe('CartPaymentConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  class MockCartPaymentAdapter implements CartPaymentAdapter {
    getProviderSubInfo = createSpy().and.returnValue(of({}));
    createSubWithProvider = createSpy().and.returnValue(of({}));
    createDetails = createSpy().and.returnValue(of({}));
    setDetails = createSpy().and.returnValue(of({}));
  }

  let service: CartPaymentConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CartPaymentAdapter, useClass: MockCartPaymentAdapter },
      ],
    });

    service = TestBed.get(CartPaymentConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProviderSubInfo should call adapter', () => {
    const adapter = TestBed.get(CartPaymentAdapter);
    service.getProviderSubInfo('1', '2').subscribe();
    expect(adapter.getProviderSubInfo).toHaveBeenCalledWith('1', '2');
  });

  it('createSubWithProvider should call adapter', () => {
    const adapter = TestBed.get(CartPaymentAdapter);
    service.createSubWithProvider('1', '2').subscribe();
    expect(adapter.createSubWithProvider).toHaveBeenCalledWith('1', '2');
  });

  it('createDetails should call adapter', () => {
    const adapter = TestBed.get(CartPaymentAdapter);
    service.createDetails('1', '2', '3').subscribe();
    expect(adapter.createDetails).toHaveBeenCalledWith('1', '2', '3');
  });

  it('setDetails should call adapter', () => {
    const adapter = TestBed.get(CartPaymentAdapter);
    service.setDetails('1', '2', '3').subscribe();
    expect(adapter.setDetails).toHaveBeenCalledWith('1', '2', '3');
  });
});
