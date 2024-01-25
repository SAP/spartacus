import { inject, TestBed } from '@angular/core/testing';
import { QueryService } from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';

import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OpfCheckoutConnector } from '../connectors/opf-checkout.connector';
import { OpfCheckoutService } from './opf-checkout.service';
import createSpy = jasmine.createSpy;

const mockActiveConfigurations: ActiveConfiguration[] = [
  {
    id: 1,
    providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
    displayName: 'Test1',
  },
  {
    id: 2,
    providerType: OpfPaymentProviderType.PAYMENT_METHOD,
    displayName: 'Test2',
  },
];

class MockOpfCheckoutConnector implements Partial<OpfCheckoutConnector> {
  getActiveConfigurations = createSpy().and.returnValue(
    of(mockActiveConfigurations)
  );
  initiatePayment = createSpy().and.returnValue(of('initiatePayment'));
}

describe(`CheckoutPaymentService`, () => {
  let service: OpfCheckoutService;
  let connector: OpfCheckoutConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfCheckoutService,
        QueryService,
        { provide: OpfCheckoutConnector, useClass: MockOpfCheckoutConnector },
      ],
    });

    service = TestBed.inject(OpfCheckoutService);
    connector = TestBed.inject(OpfCheckoutConnector);
  });

  it(`should inject OpfCheckoutService`, inject(
    [OpfCheckoutService],
    (opfCheckoutService: OpfCheckoutService) => {
      expect(opfCheckoutService).toBeTruthy();
    }
  ));

  describe(`initiatePayment`, () => {
    it(`should call the opfCheckoutConnector.initiatePayment()`, (done) => {
      service
        .initiatePayment({})
        .pipe(take(1))
        .subscribe(() => {
          expect(connector.initiatePayment).toHaveBeenCalledWith({});
          done();
        });
    });
  });
});
