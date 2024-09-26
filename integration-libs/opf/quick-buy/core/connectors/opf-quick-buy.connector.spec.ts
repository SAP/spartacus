/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
} from '@spartacus/opf/quick-buy/root';
import { of } from 'rxjs';
import { OpfQuickBuyAdapter } from './opf-quick-buy.adapter';
import { OpfQuickBuyConnector } from './opf-quick-buy.connector';
import createSpy = jasmine.createSpy;

const mockGetApplePayWebSessionRequest: ApplePaySessionVerificationRequest = {
  cartId: 'test',
  validationUrl: 'test',
  initiative: 'web',
  initiativeContext: 'test',
};

const mockGetApplePayWebSessionResponse: ApplePaySessionVerificationResponse = {
  epochTimestamp: 1,
  expiresAt: 60000,
  merchantSessionIdentifier: 'test',
  nonce: 'test',
  merchantIdentifier: 'test',
  domainName: 'test',
  displayName: 'test',
  signature: 'test',
};

const mockAccessCode = 'accessCode';

class MockOpfQuickBuyAdapter implements OpfQuickBuyAdapter {
  getApplePayWebSession = createSpy('getApplePayWebSession').and.callFake(() =>
    of(mockGetApplePayWebSessionResponse)
  );
}

describe('OpfQuickBuyConnector', () => {
  let service: OpfQuickBuyConnector;
  let adapter: OpfQuickBuyAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfQuickBuyConnector,
        { provide: OpfQuickBuyAdapter, useClass: MockOpfQuickBuyAdapter },
      ],
    });

    service = TestBed.inject(OpfQuickBuyConnector);
    adapter = TestBed.inject(OpfQuickBuyAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getApplePayWebSession should call adapter', () => {
    let result;
    service
      .getApplePayWebSession(mockGetApplePayWebSessionRequest, mockAccessCode)
      .subscribe((res) => (result = res));
    expect(result).toEqual(mockGetApplePayWebSessionResponse);
    expect(adapter.getApplePayWebSession).toHaveBeenCalledWith(
      mockGetApplePayWebSessionRequest,
      mockAccessCode
    );
  });
});
