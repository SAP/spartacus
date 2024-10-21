/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  ActiveConfiguration,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import { of } from 'rxjs';
import { OpfBaseAdapter } from './opf-base.adapter';
import { OpfBaseConnector } from './opf-base.connector';
import createSpy = jasmine.createSpy;

const mockActiveConfigurations: ActiveConfiguration[] = [
  {
    id: 1,
    providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
    displayName: 'Test1',
  },
  {
    id: 2,
    providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
    displayName: 'Test2',
  },
  {
    id: 3,
    providerType: OpfPaymentProviderType.PAYMENT_METHOD,
    displayName: 'Test3',
  },
];

class MockOpfBaseAdapter implements OpfBaseAdapter {
  getActiveConfigurations = createSpy('getActiveConfigurations').and.callFake(
    () => of(mockActiveConfigurations)
  );
}

describe('OpfBaseConnector', () => {
  let service: OpfBaseConnector;
  let adapter: OpfBaseAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfBaseConnector,
        { provide: OpfBaseAdapter, useClass: MockOpfBaseAdapter },
      ],
    });

    service = TestBed.inject(OpfBaseConnector);
    adapter = TestBed.inject(OpfBaseAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getActiveConfigurations should call adapter', () => {
    let result;
    service.getActiveConfigurations().subscribe((res) => (result = res));
    expect(result).toEqual(mockActiveConfigurations);
    expect(adapter.getActiveConfigurations).toHaveBeenCalled();
  });
});
