/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { QueryService, QueryState } from '@spartacus/core';
import {
  OpfActiveConfigurationsResponse,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import { of, firstValueFrom } from 'rxjs';
import { OpfBaseConnector } from '../connectors/opf-base.connector';
import { OpfBaseService } from './opf-base.service';

describe('OpfBaseService', () => {
  let service: OpfBaseService;
  let queryService: any;
  let opfBaseConnector: any;

  beforeEach(() => {
    const queryServiceSpy = { create: vi.fn() };
    const opfBaseConnectorSpy = { getActiveConfigurations: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        OpfBaseService,
        { provide: QueryService, useValue: queryServiceSpy },
        { provide: OpfBaseConnector, useValue: opfBaseConnectorSpy },
      ],
    });

    service = TestBed.inject(OpfBaseService);
    queryService = TestBed.inject(QueryService) as any;
    opfBaseConnector = TestBed.inject(OpfBaseConnector) as any;

    const mockActiveConfigurations: OpfActiveConfigurationsResponse = {
      page: {
        number: 1,
        totalElements: 2,
        totalPages: 1,
        size: 2,
      },
      value: [
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
      ],
    };

    opfBaseConnector.getActiveConfigurations.mockReturnValue(
      of(mockActiveConfigurations)
    );

    const mockQuery = {
      get: vi.fn().mockReturnValue(of(mockActiveConfigurations)),
      getState: vi.fn().mockReturnValue(
        of({
          loading: false,
          error: undefined,
          data: mockActiveConfigurations,
        })
      ),
    };

    queryService.create.mockReturnValue(mockQuery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getActiveConfigurationsState should return an observable with the correct state and call the connector', async () => {
    const state = await firstValueFrom(service.getActiveConfigurationsState());
    expect(state.loading).toBeFalsy();
    expect(state.error).toBeUndefined();
    expect(state.data?.value).toEqual([
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

    expect(queryService.create).toHaveBeenCalled();
  });
});
