/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { CommandService } from '@spartacus/core';
import { CtaScriptsRequest, CtaScriptsResponse } from '@spartacus/opf/cta/root';
import { Observable, of } from 'rxjs';
import { OpfCtaService } from './opf-cta.service';
import { OpfCtaConnector } from '../connectors/opf-cta.connector';

class MockCommandService {
  create(fn: (payload: any) => Observable<CtaScriptsResponse>) {
    return {
      execute: (payload: any) => fn(payload),
    };
  }
}

const ctaScriptsResponseMock: CtaScriptsResponse = {
  value: [
    {
      paymentAccountId: 1,
      dynamicScript: {
        html: '<div  style="border-style: solid;text-align:center;border-radius:10px;align-content:center;background-color:yellow;color:black"><h2>Thanks for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log(\'CTA Script #1 is running\')</script>',
        cssUrls: [
          {
            url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.css',
            sri: '',
          },
        ],
        jsUrls: [
          {
            url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.js',
            sri: '',
          },
        ],
      },
    },
  ],
};

class MockOpfCtaConnector {
  getCtaScripts(
    _ctaScriptsRequest: CtaScriptsRequest
  ): Observable<CtaScriptsResponse> {
    return of(ctaScriptsResponseMock);
  }
}

describe('OpfCtaService', () => {
  let service: OpfCtaService;
  let commandService: MockCommandService;
  let opfCtaConnector: MockOpfCtaConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfCtaService,
        { provide: CommandService, useClass: MockCommandService },
        { provide: OpfCtaConnector, useClass: MockOpfCtaConnector },
      ],
    });

    service = TestBed.inject(OpfCtaService);
    commandService = TestBed.inject(CommandService);
    opfCtaConnector = TestBed.inject(OpfCtaConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute getCtaScripts and return response', (done) => {
    spyOn(opfCtaConnector, 'getCtaScripts').and.callThrough();
    spyOn(commandService, 'create').and.callThrough();
    const request: CtaScriptsRequest = {
      paymentAccountIds: [1],
      cartId: 'cart123',
      ctaProductItems: [{ productId: 'prod123', quantity: 1 }],
    };

    service.getCtaScripts(request).subscribe((response: CtaScriptsResponse) => {
      expect(response).toEqual(ctaScriptsResponseMock);
      expect(opfCtaConnector.getCtaScripts).toHaveBeenCalledWith(request);
      done();
    });
  });

  it('should emit script ready event', () => {
    let emittedValue: string | undefined;

    service.listenScriptReadyEvent().subscribe((value) => {
      emittedValue = value;
    });

    const scriptIdentifier = 'script1';
    service.emitScriptReadyEvent(scriptIdentifier);

    expect(emittedValue).toBe(scriptIdentifier);
  });
});
