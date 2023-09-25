import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OpfPaymentAdapter } from './opf-payment.adapter';
import { OpfPaymentConnector } from './opf-payment.connector';
import createSpy = jasmine.createSpy;

class MockOpfPaymentAdapter implements OpfPaymentAdapter {
  verifyPayment = createSpy().and.returnValue(of({}));
  submitPayment = createSpy().and.returnValue(of({}));
  submitCompletePayment = createSpy().and.returnValue(of({}));
  afterRedirectScripts = createSpy().and.returnValue(of({}));
}

describe('OpfPaymentConnector', () => {
  let service: OpfPaymentConnector;
  let adapter: OpfPaymentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfPaymentConnector,
        {
          provide: OpfPaymentAdapter,
          useClass: MockOpfPaymentAdapter,
        },
      ],
    });

    service = TestBed.inject(OpfPaymentConnector);
    adapter = TestBed.inject(OpfPaymentAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verifyPayment method from adapter', () => {
    service
      .verifyPayment('1', { responseMap: [{ key: 'test', value: 'value' }] })
      .pipe(take(1))
      .subscribe();
    expect(adapter.verifyPayment).toHaveBeenCalledWith('1', {
      responseMap: [{ key: 'test', value: 'value' }],
    });
  });

  it('should call submitPayment method from adapter', () => {
    service.submitPayment({}, '1', '2').pipe(take(1)).subscribe();
    expect(adapter.submitPayment).toHaveBeenCalledWith({}, '1', '2');
  });

  it('should call submitCompletePayment method from adapter', () => {
    service.submitCompletePayment({}, '1', '2').pipe(take(1)).subscribe();
    expect(adapter.submitCompletePayment).toHaveBeenCalledWith({}, '1', '2');
  });

  it('should call afterRedirectScripts method from adapter', () => {
    service.afterRedirectScripts('1').pipe(take(1)).subscribe();
    expect(adapter.afterRedirectScripts).toHaveBeenCalledWith('1');
  });
});
