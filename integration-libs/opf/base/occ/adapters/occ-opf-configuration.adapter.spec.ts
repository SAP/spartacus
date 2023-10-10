// /*
//  * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import {
//   BaseOccUrlProperties,
//   ConverterService,
//   DynamicAttributes,
//   normalizeHttpError,
// } from '@spartacus/core';
// import {
//   OpfEndpointsService,
//   OPF_ACTIVE_CONFIGURATION_NORMALIZER,
// } from '@spartacus/opf/base/core';
// import {
//   ActiveConfiguration,
//   OpfConfig,
//   OPF_CC_PUBLIC_KEY,
// } from '@spartacus/opf/base/root';
// import { PaymentSessionData } from '@spartacus/opf/checkout/root';

// import { throwError } from 'rxjs';
// import { OccOpfConfigurationAdapter } from './occ-opf-configuration.adapter';

// const mockResponse: ActiveConfiguration[] = [
//   {
//     description: 'Sample description',
//     id: 1,
//     merchantId: 'sampleMerchantId',
//   },
// ];

// const commerceCloudPublicKey = 'testKey';
// const mockOpfConfig: OpfConfig = {
//   opf: {
//     baseUrl: 'testUrl',
//     commerceCloudPublicKey,
//   },
// };

// const mockPaymentSessionData: PaymentSessionData = {
//   paymentSessionId: '1234567890',
// };

// const mockError = new HttpErrorResponse({ error: 'error' });

// const normalizedError = normalizeHttpError(mockError);

// export class MockOpfEndpointsService implements Partial<OpfEndpointsService> {
//   buildUrl(
//     endpoint: string,
//     _attributes?: DynamicAttributes,
//     _propertiesToOmit?: BaseOccUrlProperties
//   ) {
//     return this.getEndpoint(endpoint);
//   }

//   getEndpoint(endpoint: string) {
//     if (!endpoint.startsWith('/')) {
//       endpoint = '/' + endpoint;
//     }
//     return endpoint;
//   }

//   getBaseUrl() {
//     return '';
//   }

//   isConfigured() {
//     return true;
//   }
// }

// describe('OccOpfConfigurationAdapter', () => {
//   let occOpfConfigurationAdapter: OccOpfConfigurationAdapter;
//   let httpMock: HttpTestingController;
//   let http: HttpClient;
//   let converter: ConverterService;
//   let opfEndpointsService: OpfEndpointsService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         OccOpfConfigurationAdapter,
//         {
//           provide: OpfEndpointsService,
//           useClass: MockOpfEndpointsService,
//         },
//         {
//           provide: OpfConfig,
//           useValue: mockOpfConfig,
//         },
//       ],
//     });

//     occOpfConfigurationAdapter = TestBed.inject(OccOpfConfigurationAdapter);
//     httpMock = TestBed.inject(HttpTestingController);
//     http = TestBed.inject(HttpClient);
//     converter = TestBed.inject(ConverterService);
//     opfEndpointsService = TestBed.inject(OpfEndpointsService);
//     spyOn(converter, 'convert').and.callThrough();
//     spyOn(converter, 'pipeable').and.callThrough();
//     spyOn(opfEndpointsService, 'buildUrl').and.callThrough();
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   describe('getActiveConfigurations -', () => {
//     it('should return cart modification list based on provided params', () => {
//       occOpfConfigurationAdapter.getActiveConfigurations().subscribe();

//       const mockReq = httpMock.expectOne((req) => {
//         return req.method === 'GET';
//       });

//       expect(opfEndpointsService.buildUrl).toHaveBeenCalled();
//       expect(
//         mockReq.request.headers.get('sap-commerce-cloud-public-key')
//       ).toEqual(commerceCloudPublicKey);
//       expect(mockReq.cancelled).toBeFalsy();
//       expect(mockReq.request.responseType).toEqual('json');
//       mockReq.flush(mockResponse);
//     });

//     it('should use converter', () => {
//       occOpfConfigurationAdapter.getActiveConfigurations().subscribe();
//       httpMock
//         .expectOne((req) => {
//           return req.method === 'GET';
//         })
//         .flush(mockResponse);
//       expect(converter.pipeable).toHaveBeenCalledWith(
//         OPF_ACTIVE_CONFIGURATION_NORMALIZER
//       );
//     });

//     it('should handle errors', (done) => {
//       spyOn(http, 'get').and.returnValue(throwError(mockError));

//       occOpfConfigurationAdapter.getActiveConfigurations().subscribe({
//         error: (error) => {
//           expect(error).toEqual(normalizedError);
//           done();
//         },
//       });
//     });

//     it('should set commerceCloudPublicKey to empty string', () => {
//       mockOpfConfig.opf.commerceCloudPublicKey = null;
//       occOpfConfigurationAdapter.getActiveConfigurations().subscribe();
//       const mockReq = httpMock.expectOne((req) => {
//         return req.method === 'GET';
//       });
//       expect(mockReq.request.headers.get(OPF_CC_PUBLIC_KEY)).toEqual('');
//       mockReq.flush(mockPaymentSessionData);
//       mockOpfConfig.opf.commerceCloudPublicKey = commerceCloudPublicKey;
//     });
//   });
// });
