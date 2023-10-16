// import { TestBed } from '@angular/core/testing';
// import { CmsService } from '@spartacus/core';
// import { OpfResourceLoaderService } from '@spartacus/opf/base/root';
// import { OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
// import { of } from 'rxjs';
// import { OpfCtaScriptsService } from './opf-cta-scripts.service';

// describe('OpfCtaScriptsService', () => {
//   let service: OpfCtaScriptsService;
//   let orderFacadeMock: jasmine.SpyObj<OrderFacade>;
//   let orderHistoryFacadeMock: jasmine.SpyObj<OrderHistoryFacade>;
//   let opfResourceLoaderServiceMock: jasmine.SpyObj<OpfResourceLoaderService>;
//   let cmsServiceMock: jasmine.SpyObj<CmsService>;

//   beforeEach(() => {
//     orderFacadeMock = jasmine.createSpyObj('OrderFacade', ['getOrderDetails']);
//     orderHistoryFacadeMock = jasmine.createSpyObj('OrderHistoryFacade', [
//       'getOrderDetails',
//     ]);
//     opfResourceLoaderServiceMock = jasmine.createSpyObj(
//       'OpfResourceLoaderService',
//       [
//         'executeScriptFromHtml',
//         'loadProviderResources',
//         'clearAllProviderResources',
//       ]
//     );
//     cmsServiceMock = jasmine.createSpyObj('CmsService', ['getCurrentPage']);
//     TestBed.configureTestingModule({
//       providers: [
//         OpfCtaScriptsService,
//         { provide: OrderFacade, useValue: orderFacadeMock },
//         { provide: OrderHistoryFacade, useValue: orderHistoryFacadeMock },
//         {
//           provide: OpfResourceLoaderService,
//           useValue: opfResourceLoaderServiceMock,
//         },
//         { provide: CmsService, useValue: cmsServiceMock },
//       ],
//     });
//     service = TestBed.inject(OpfCtaScriptsService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should get ctaScripts', () => {
//     orderFacadeMock.getOrderDetails.and.returnValue(of(mockOrder));
//     orderHistoryFacadeMock.getOrderDetails.and.returnValue(of(mockOrder));

//     opfResourceLoaderServiceMock.executeScriptFromHtml.and.returnValue();
//     opfResourceLoaderServiceMock.loadProviderResources.and.returnValue(Promise<void>);

//     service.getCtaHtmlslList().subscribe((htmlsList) => {});
//     expect(service).toBeTruthy();
//   });

//   // const mockCtaScriptsResponse = {
//   //   value: [
//   //     {
//   //       paymentAccountId: 1,
//   //       dynamicScript: {
//   //         html: "<h2>CTA Html snippet #1</h2><script>alert('CTA Script #1 is running')</script>",
//   //         cssUrls: [
//   //           {
//   //             url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.css',
//   //             sri: '',
//   //           },
//   //         ],
//   //         jsUrls: [
//   //           {
//   //             url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.js',
//   //             sri: '',
//   //           },
//   //         ],
//   //       },
//   //     },
//   //   ],
//   // };

//   const mockOrder = {
//     code: 'mockOrder',
//     entries: [
//       {
//         product: {
//           code: '11',
//         },
//         quantity: '1',
//       },
//       {
//         product: {
//           code: '22',
//         },
//         quantity: '1',
//       },
//     ],
//   };
// });
