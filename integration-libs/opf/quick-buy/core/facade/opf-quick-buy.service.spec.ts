/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
} from '@spartacus/opf/quick-buy/root';
import { of } from 'rxjs';
import { OpfQuickBuyConnector } from '../connectors';
import { OpfQuickBuyService } from './opf-quick-buy.service';

const mockGetApplePayWebSessionRequest: ApplePaySessionVerificationRequest = {
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

const mockAccessCode = 'mockAccessCode';

describe('OpfQuickBuyService', () => {
  let service: OpfQuickBuyService;
  let opfQuickBuyConnector: any;
  let cartAccessCodeFacade: any;
  let activeCartFacade: any;
  let userIdService: any;

  beforeEach(() => {
    const opfQuickBuyConnectorSpy = { getApplePayWebSession: vi.fn() };
    const cartAccessCodeFacadeSpy = { getCartAccessCode: vi.fn() };
    const activeCartFacadeSpy = { getActiveCartId: vi.fn() };
    const userIdServiceSpy = { getUserId: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        OpfQuickBuyService,
        { provide: OpfQuickBuyConnector, useValue: opfQuickBuyConnectorSpy },
        { provide: CartAccessCodeFacade, useValue: cartAccessCodeFacadeSpy },
        { provide: ActiveCartFacade, useValue: activeCartFacadeSpy },
        { provide: UserIdService, useValue: userIdServiceSpy },
      ],
    });

    service = TestBed.inject(OpfQuickBuyService);
    opfQuickBuyConnector = TestBed.inject(OpfQuickBuyConnector) as any;
    cartAccessCodeFacade = TestBed.inject(CartAccessCodeFacade) as any;
    activeCartFacade = TestBed.inject(ActiveCartFacade) as any;
    userIdService = TestBed.inject(UserIdService) as any;
  });

  it('should successfully get ApplePay web session', async () => {
    userIdService.getUserId.mockReturnValue(of('mockUserId'));
    activeCartFacade.getActiveCartId.mockReturnValue(of('mockCartId'));
    cartAccessCodeFacade.getCartAccessCode.mockReturnValue(
      of({ accessCode: mockAccessCode })
    );
    opfQuickBuyConnector.getApplePayWebSession.mockReturnValue(
      of(mockGetApplePayWebSessionResponse)
    );

    service
      .getApplePayWebSession(mockGetApplePayWebSessionRequest)
      .subscribe((response) => {
        expect(response).toEqual(mockGetApplePayWebSessionResponse);
        expect(opfQuickBuyConnector.getApplePayWebSession).toHaveBeenCalledWith(
          mockGetApplePayWebSessionRequest,
          mockAccessCode
        );
      });
  });
});
