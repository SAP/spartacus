import { TestBed } from '@angular/core/testing';
import { ActiveConfiguration } from '@spartacus/opf/base/root';
import { EMPTY, Observable } from 'rxjs';
import { PaymentInitiationConfig, PaymentSessionData } from '../../root/model';
import { OpfCheckoutConnector } from './opf-checkout.connector';
import { OpfAdapter } from './opf.adapter';

class MockOpfAdapter implements Partial<OpfAdapter> {
  getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    return EMPTY;
  }
  initiatePayment(
    _paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData> {
    return EMPTY;
  }
}

describe('OpfCheckoutConnector', () => {
  let service: OpfCheckoutConnector;
  let adapter: OpfAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfCheckoutConnector,
        { provide: OpfAdapter, useClass: MockOpfAdapter },
      ],
    });

    service = TestBed.inject(OpfCheckoutConnector);
    adapter = TestBed.inject(OpfAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initiatePayment should call adapter', () => {
    const paymentConfig: PaymentInitiationConfig = {
      otpKey: 'test',
      config: {},
    };
    spyOn(adapter, 'initiatePayment').and.stub();
    service.initiatePayment(paymentConfig);

    expect(adapter.initiatePayment).toHaveBeenCalledWith(paymentConfig);
  });
});
