/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { OpfPaymentEventsService } from '@spartacus/opf/payment/root';
import { EMPTY, throwError } from 'rxjs';
import { OPF_GIFT_CARD_AUTH_ERROR_TYPE } from '../config/constants';
import { OpfGiftCardPaymentApiInterceptor } from './opf-gift-card-payment-api.interceptor';

const PLACE_ORDER_URL = '/orders/paymentAuthorizedOrderPlacement';
const OTHER_URL = '/some/other/endpoint';

describe('OpfGiftCardPaymentApiInterceptor (CXSPA-14589)', () => {
  let interceptor: OpfGiftCardPaymentApiInterceptor;
  let activeCartFacadeMock: jasmine.SpyObj<ActiveCartFacade>;
  let opfMetadataStoreServiceMock: jasmine.SpyObj<OpfMetadataStoreService>;
  let opfPaymentEventsServiceMock: jasmine.SpyObj<OpfPaymentEventsService>;
  let nextMock: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    activeCartFacadeMock = jasmine.createSpyObj('ActiveCartFacade', [
      'reloadActiveCart',
    ]);
    opfMetadataStoreServiceMock = jasmine.createSpyObj(
      'OpfMetadataStoreService',
      ['updateOpfMetadata']
    );
    opfPaymentEventsServiceMock = jasmine.createSpyObj(
      'OpfPaymentEventsService',
      ['emitReinitiatePaymentEvent']
    );
    nextMock = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        OpfGiftCardPaymentApiInterceptor,
        { provide: ActiveCartFacade, useValue: activeCartFacadeMock },
        {
          provide: OpfMetadataStoreService,
          useValue: opfMetadataStoreServiceMock,
        },
        {
          provide: OpfPaymentEventsService,
          useValue: opfPaymentEventsServiceMock,
        },
      ],
    });

    interceptor = TestBed.inject(OpfGiftCardPaymentApiInterceptor);
  });

  it('should pass through requests not matching paymentAuthorizedOrderPlacement', () => {
    const request = new HttpRequest('POST', OTHER_URL, {});
    nextMock.handle.and.returnValue(EMPTY);

    interceptor.intercept(request, nextMock).subscribe();

    expect(nextMock.handle).toHaveBeenCalledWith(request);
    expect(activeCartFacadeMock.reloadActiveCart).not.toHaveBeenCalled();
  });

  it('should reload cart on any paymentAuthorizedOrderPlacement failure', () => {
    const request = new HttpRequest('POST', PLACE_ORDER_URL, {});
    const error = new HttpErrorResponse({ status: 500, url: PLACE_ORDER_URL });
    nextMock.handle.and.returnValue(throwError(() => error));

    interceptor.intercept(request, nextMock).subscribe({ error: () => {} });

    expect(activeCartFacadeMock.reloadActiveCart).toHaveBeenCalled();
  });

  it('should clear payment session and re-initiate payment on SAPCartStoredValueAuthorizationError', () => {
    const request = new HttpRequest('POST', PLACE_ORDER_URL, {});
    const error = new HttpErrorResponse({
      status: 400,
      url: PLACE_ORDER_URL,
      error: {
        errors: [{ type: OPF_GIFT_CARD_AUTH_ERROR_TYPE }],
      },
    });
    nextMock.handle.and.returnValue(throwError(() => error));

    interceptor.intercept(request, nextMock).subscribe({ error: () => {} });

    expect(activeCartFacadeMock.reloadActiveCart).toHaveBeenCalled();
    expect(opfMetadataStoreServiceMock.updateOpfMetadata).toHaveBeenCalledWith({
      opfPaymentSessionId: undefined,
      opfPaymentSessionConfigurationId: undefined,
    });
    expect(
      opfPaymentEventsServiceMock.emitReinitiatePaymentEvent
    ).toHaveBeenCalled();
  });

  it('should not clear session or re-initiate payment for other error types', () => {
    const request = new HttpRequest('POST', PLACE_ORDER_URL, {});
    const error = new HttpErrorResponse({
      status: 400,
      url: PLACE_ORDER_URL,
      error: {
        errors: [{ type: 'SomeOtherError' }],
      },
    });
    nextMock.handle.and.returnValue(throwError(() => error));

    interceptor.intercept(request, nextMock).subscribe({ error: () => {} });

    expect(activeCartFacadeMock.reloadActiveCart).toHaveBeenCalled();
    expect(
      opfMetadataStoreServiceMock.updateOpfMetadata
    ).not.toHaveBeenCalled();
    expect(
      opfPaymentEventsServiceMock.emitReinitiatePaymentEvent
    ).not.toHaveBeenCalled();
  });

  it('should propagate the error after handling', (done) => {
    const request = new HttpRequest('POST', PLACE_ORDER_URL, {});
    const error = new HttpErrorResponse({ status: 500, url: PLACE_ORDER_URL });
    nextMock.handle.and.returnValue(throwError(() => error));

    interceptor.intercept(request, nextMock).subscribe({
      error: (err) => {
        expect(err).toBe(error);
        done();
      },
    });
  });
});
