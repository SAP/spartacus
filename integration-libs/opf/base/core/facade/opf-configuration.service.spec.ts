import { inject, TestBed } from '@angular/core/testing';
import { QueryService } from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfPaymentProviderType,
} from '@spartacus/opf/checkout/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OpfConfigurationConnector } from '../connectors/opf-configuration.connector';
import { OpfConfigurationService } from './opf-configuration.service';

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

class MockOpfConfigurationConnector
  implements Partial<OpfConfigurationConnector>
{
  getActiveConfigurations = createSpy().and.returnValue(
    of(mockActiveConfigurations)
  );
  initiatePayment = createSpy().and.returnValue(of('initiatePayment'));
}

describe(`OpfConfigurationService`, () => {
  let service: OpfConfigurationService;
  let connector: OpfConfigurationConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfConfigurationService,
        QueryService,
        {
          provide: OpfConfigurationConnector,
          useClass: MockOpfConfigurationConnector,
        },
      ],
    });

    service = TestBed.inject(OpfConfigurationService);
    connector = TestBed.inject(OpfConfigurationConnector);
  });

  it(`should inject OpfConfigurationService`, inject(
    [OpfConfigurationService],
    (opfConfigurationService: OpfConfigurationService) => {
      expect(opfConfigurationService).toBeTruthy();
    }
  ));

  describe(`getActiveConfigurationsState`, () => {
    it(`should call the opfConfigurationConnector.getActiveConfigurations()`, (done) => {
      service
        .getActiveConfigurationsState()
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getActiveConfigurations).toHaveBeenCalled();
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockActiveConfigurations,
          });
          done();
        });
    });
  });
});
