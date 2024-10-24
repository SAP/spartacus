/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QueryService, QueryState } from '@spartacus/core';
import { OpfBaseConnector } from '../connectors/opf-base.connector';
import { OpfBaseService } from './opf-base.service';
import {
  ActiveConfiguration,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';

describe('OpfBaseService', () => {
  let service: OpfBaseService;
  let queryService: jasmine.SpyObj<QueryService>;
  let opfBaseConnector: jasmine.SpyObj<OpfBaseConnector>;

  beforeEach(() => {
    const queryServiceSpy = jasmine.createSpyObj('QueryService', ['create']);
    const opfBaseConnectorSpy = jasmine.createSpyObj('OpfBaseConnector', [
      'getActiveConfigurations',
    ]);

    TestBed.configureTestingModule({
      providers: [
        OpfBaseService,
        { provide: QueryService, useValue: queryServiceSpy },
        { provide: OpfBaseConnector, useValue: opfBaseConnectorSpy },
      ],
    });

    service = TestBed.inject(OpfBaseService);
    queryService = TestBed.inject(QueryService) as jasmine.SpyObj<QueryService>;
    opfBaseConnector = TestBed.inject(
      OpfBaseConnector
    ) as jasmine.SpyObj<OpfBaseConnector>;

    const mockActiveConfigurations: ActiveConfiguration[] = [
      {
        id: 1,
        description: 'Payment gateway for merchant 123',
        merchantId: '123',
        providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
        displayName: 'Gateway 123',
        acquirerCountryCode: 'US',
      },
      {
        id: 2,
        description: 'Payment method for merchant 456',
        merchantId: '456',
        providerType: OpfPaymentProviderType.PAYMENT_METHOD,
        displayName: 'Method 456',
        acquirerCountryCode: 'GB',
      },
    ];

    opfBaseConnector.getActiveConfigurations.and.returnValue(
      of(mockActiveConfigurations)
    );

    const mockQuery = {
      get: jasmine
        .createSpy('get')
        .and.returnValue(of(mockActiveConfigurations)),
      getState: jasmine.createSpy('getState').and.returnValue(
        of({
          loading: false,
          error: undefined,
          data: mockActiveConfigurations,
        })
      ),
    };

    queryService.create.and.returnValue(mockQuery);
    service['activeConfigurationsQuery'] = mockQuery;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getActiveConfigurationsState should return an observable with the correct state and call the connector', (done: DoneFn) => {
    service
      .getActiveConfigurationsState()
      .subscribe((state: QueryState<ActiveConfiguration[] | undefined>) => {
        expect(state.loading).toBeFalsy();
        expect(state.error).toBeUndefined();
        expect(state.data).toEqual([
          {
            id: 1,
            description: 'Payment gateway for merchant 123',
            merchantId: '123',
            providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
            displayName: 'Gateway 123',
            acquirerCountryCode: 'US',
          },
          {
            id: 2,
            description: 'Payment method for merchant 456',
            merchantId: '456',
            providerType: OpfPaymentProviderType.PAYMENT_METHOD,
            displayName: 'Method 456',
            acquirerCountryCode: 'GB',
          },
        ]);
        done();
      });

    expect(queryService.create).toHaveBeenCalled();
  });
});
