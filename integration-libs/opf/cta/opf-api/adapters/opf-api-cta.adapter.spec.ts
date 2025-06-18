/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, LoggerService } from '@spartacus/core';
import { OpfEndpointsService } from '@spartacus/opf/base/core';
import {
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfConfig,
  OpfDynamicScriptResourceType,
  OpfMetadataStatePersistanceService,
} from '@spartacus/opf/base/root';
import {
  OpfCtaScriptsRequest,
  OpfCtaScriptsResponse,
} from '@spartacus/opf/cta/root';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OpfApiCtaAdapter } from './opf-api-cta.adapter';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

const mockCtaScriptsRequest: OpfCtaScriptsRequest = {
  paymentAccountIds: [123],
  cartId: 'mockCartId',
  additionalData: [
    { key: 'divisionId', value: 'mockDivision' },
    { key: 'currency', value: 'USD' },
  ],
};

const mockCtaScriptsResponse: OpfCtaScriptsResponse = {
  value: [
    {
      paymentAccountId: 123,
      dynamicScript: {
        html: '<html></html>',
        jsUrls: [
          {
            url: 'script.js',
            type: OpfDynamicScriptResourceType.SCRIPT,
          },
        ],
        cssUrls: [
          {
            url: 'styles.css',
            type: OpfDynamicScriptResourceType.STYLES,
          },
        ],
      },
    },
  ],
};

const mockOpfConfig: OpfConfig = {
  opf: {
    commerceCloudPublicKey: 'mockPublicKey',
  },
};

class MockOpfMetadataStatePersistanceService
  implements Partial<OpfMetadataStatePersistanceService>
{
  getActiveLanguage(): string {
    return 'en-us';
  }
}

describe('OpfApiCtaAdapter', () => {
  let adapter: OpfApiCtaAdapter;
  let httpMock: HttpTestingController;
  let converterService: jasmine.SpyObj<ConverterService>;
  let opfEndpointsService: jasmine.SpyObj<OpfEndpointsService>;

  beforeEach(() => {
    const converterSpy = jasmine.createSpyObj('ConverterService', ['pipeable']);
    const opfEndpointsSpy = jasmine.createSpyObj('OpfEndpointsService', [
      'buildUrl',
    ]);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OpfApiCtaAdapter,
        { provide: OpfConfig, useValue: mockOpfConfig },
        { provide: ConverterService, useValue: converterSpy },
        { provide: OpfEndpointsService, useValue: opfEndpointsSpy },
        {
          provide: OpfMetadataStatePersistanceService,
          useClass: MockOpfMetadataStatePersistanceService,
        },
        LoggerService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OpfApiCtaAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(
      ConverterService
    ) as jasmine.SpyObj<ConverterService>;
    opfEndpointsService = TestBed.inject(
      OpfEndpointsService
    ) as jasmine.SpyObj<OpfEndpointsService>;

    opfEndpointsService.buildUrl.and.returnValue('mockUrl');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch CTA scripts successfully', () => {
    converterService.pipeable.and.returnValue(
      (input$: Observable<OpfCtaScriptsResponse>) => input$
    );

    adapter.getCtaScripts(mockCtaScriptsRequest).subscribe((response) => {
      expect(response).toEqual(mockCtaScriptsResponse);
    });

    const req = httpMock.expectOne('mockUrl');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get(OPF_CC_PUBLIC_KEY_HEADER)).toBe(
      'mockPublicKey'
    );
    expect(req.request.headers.get('Accept-Language')).toBe('en-us');
    expect(req.request.body).toEqual(mockCtaScriptsRequest);

    req.flush(mockCtaScriptsResponse);
  });

  it('should handle server error and normalize the error', () => {
    const mockErrorResponse = {
      status: 500,
      statusText: 'Internal Server Error',
    };

    converterService.pipeable.and.returnValue(
      (input$: Observable<OpfCtaScriptsResponse>) => input$
    );

    adapter
      .getCtaScripts(mockCtaScriptsRequest)
      .pipe(
        catchError((error) => {
          expect(error).toEqual(jasmine.any(Error));
          return of(null);
        })
      )
      .subscribe();

    const req = httpMock.expectOne('mockUrl');
    req.flush(null, mockErrorResponse);
  });
});
