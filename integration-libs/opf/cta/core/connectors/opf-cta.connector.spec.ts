/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  OpfCtaScriptsRequest,
  OpfCtaScriptsResponse,
} from '@spartacus/opf/cta/root';
import { of } from 'rxjs';
import { OpfCtaAdapter } from './opf-cta.adapter';
import { OpfCtaConnector } from './opf-cta.connector';
import createSpy = jasmine.createSpy;

const mockCtaScriptsRequest: OpfCtaScriptsRequest = {
  cartId: '123',
  paymentAccountIds: [123],
};

const mockCtaScriptsResponse: OpfCtaScriptsResponse = {
  value: [],
};

class MockOpfCtaAdapter implements OpfCtaAdapter {
  getCtaScripts = createSpy('getCtaScripts').and.callFake(() =>
    of(mockCtaScriptsResponse)
  );
}

describe('OpfCtaConnector', () => {
  let service: OpfCtaConnector;
  let adapter: OpfCtaAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfCtaConnector,
        { provide: OpfCtaAdapter, useClass: MockOpfCtaAdapter },
      ],
    });

    service = TestBed.inject(OpfCtaConnector);
    adapter = TestBed.inject(OpfCtaAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCtaScripts should call adapter', () => {
    let result;
    service
      .getCtaScripts(mockCtaScriptsRequest)
      .subscribe((res) => (result = res));
    expect(result).toEqual(mockCtaScriptsResponse);
    expect(adapter.getCtaScripts).toHaveBeenCalledWith(mockCtaScriptsRequest);
  });
});
