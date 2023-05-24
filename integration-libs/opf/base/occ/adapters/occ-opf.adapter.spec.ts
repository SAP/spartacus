/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: Add unit tests...

// import {
//   HttpTestingController,
//   HttpClientTestingModule,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import {
//   BaseOccUrlProperties,
//   ConverterService,
//   DynamicAttributes,
// } from '@spartacus/core';
// import {
//   OpfEndpointsService,
//   OPF_ACTIVE_CONFIGURATION_NORMALIZER,
// } from '@spartacus/opf/core';
// import { ActiveConfiguration, OpfConfig } from '@spartacus/opf/root';
// import { OccOpfAdapter } from './occ-opf.adapter';

// const mockResponse: ActiveConfiguration[] = [];
// const mockOpfConfig: OpfConfig = {
//   opf: {
//     baseUrl: 'testUrl',
//     commerceCloudPublicKey: 'testKey',
//   },
// };

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

// describe('OccOpfAdapter', () => {
//   let occOpfAdapter: OccOpfAdapter;
//   let httpMock: HttpTestingController;
//   let converter: ConverterService;
//   let opfEndpointsService: OpfEndpointsService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         OccOpfAdapter,
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

//     occOpfAdapter = TestBed.inject(OccOpfAdapter);
//     httpMock = TestBed.inject(HttpTestingController);
//     converter = TestBed.inject(ConverterService);
//     opfEndpointsService = TestBed.inject(OpfEndpointsService);
//     spyOn(converter, 'convert').and.callThrough();
//     spyOn(converter, 'pipeable').and.callThrough();
//     spyOn(opfEndpointsService, 'buildUrl').and.callThrough();
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should return cart modification list based on provided params', () => {
//     occOpfAdapter.getActiveConfigurations().subscribe();

//     const mockReq = httpMock.expectOne((req) => {
//       return req.method === 'GET';
//     });

//     expect(opfEndpointsService.buildUrl).toHaveBeenCalled();
//     expect(
//       mockReq.request.headers.get('sap-commerce-cloud-public-key')
//     ).toEqual(mockOpfConfig.opf?.commerceCloudPublicKey);
//     expect(mockReq.cancelled).toBeFalsy();
//     expect(mockReq.request.responseType).toEqual('json');
//     mockReq.flush(mockResponse);
//   });

//   it('should use converter', () => {
//     occOpfAdapter.getActiveConfigurations().subscribe();
//     httpMock
//       .expectOne((req) => {
//         return req.method === 'GET';
//       })
//       .flush(mockResponse);
//     expect(converter.pipeable).toHaveBeenCalledWith(
//       OPF_ACTIVE_CONFIGURATION_NORMALIZER
//     );
//   });
// });
