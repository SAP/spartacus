/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
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

const mockAccessCode = 'mockAccessCode';

describe('OpfQuickBuyService', () => {
  let service: OpfQuickBuyService;
  let opfQuickBuyConnector: jasmine.SpyObj<OpfQuickBuyConnector>;
  let cartAccessCodeFacade: jasmine.SpyObj<CartAccessCodeFacade>;
  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;
  let userIdService: jasmine.SpyObj<UserIdService>;

  beforeEach(() => {
    const opfQuickBuyConnectorSpy = jasmine.createSpyObj(
      'OpfQuickBuyConnector',
      ['getApplePayWebSession']
    );
    const cartAccessCodeFacadeSpy = jasmine.createSpyObj(
      'CartAccessCodeFacade',
      ['getCartAccessCode']
    );
    const activeCartFacadeSpy = jasmine.createSpyObj('ActiveCartFacade', [
      'getActiveCartId',
    ]);
    const userIdServiceSpy = jasmine.createSpyObj('UserIdService', [
      'getUserId',
    ]);

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
    opfQuickBuyConnector = TestBed.inject(
      OpfQuickBuyConnector
    ) as jasmine.SpyObj<OpfQuickBuyConnector>;
    cartAccessCodeFacade = TestBed.inject(
      CartAccessCodeFacade
    ) as jasmine.SpyObj<CartAccessCodeFacade>;
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as jasmine.SpyObj<ActiveCartFacade>;
    userIdService = TestBed.inject(
      UserIdService
    ) as jasmine.SpyObj<UserIdService>;
  });

  it('should successfully get ApplePay web session', (done) => {
    userIdService.getUserId.and.returnValue(of('mockUserId'));
    activeCartFacade.getActiveCartId.and.returnValue(of('mockCartId'));
    cartAccessCodeFacade.getCartAccessCode.and.returnValue(
      of({ accessCode: mockAccessCode })
    );
    opfQuickBuyConnector.getApplePayWebSession.and.returnValue(
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
        done();
      });
  });
});
