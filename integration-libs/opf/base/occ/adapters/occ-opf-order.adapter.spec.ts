// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { fakeAsync, TestBed, tick } from '@angular/core/testing';
// import {
//   ConverterService,
//   HttpErrorModel,
//   InterceptorUtil,
//   normalizeHttpError,
//   Occ,
//   OCC_USER_ID_ANONYMOUS,
//   OccEndpointsService,
//   USE_CLIENT_TOKEN,
// } from '@spartacus/core';
// import { defer, of, throwError } from 'rxjs';
// import { OccOpfOrderAdapter } from './occ-opf-order.adapter';
// import {
//   HttpClient,
//   HttpErrorResponse,
//   HttpHeaders,
// } from '@angular/common/http';
// import { Order, ORDER_NORMALIZER } from '@spartacus/order/root';
// import { opfHttp500ErrorRetry } from '../utils/opf-occ-http-error-handlers';

// const mockJaloError = new HttpErrorResponse({
//   error: {
//     errors: [
//       {
//         message: 'The application has encountered an error',
//         type: 'JaloObjectNoLongerValidError',
//       },
//     ],
//   },
// });

// const mock500Error = new HttpErrorResponse({
//   error: 'error',
//   status: 500,
//   statusText: 'Internal Server Error',
// });

// const mock500ErrorRetry = opfHttp500ErrorRetry;

// class MockOccEndpointsService implements Partial<OccEndpointsService> {
//   buildUrl(_endpoint = 'placeOpfOrder', attributes) {
//     if (attributes.urlParams.userId === 'anonymous') {
//       return 'anonymous';
//     }
//     return 'mock-url';
//   }
// }

// describe('OccOpfOrderAdapter', () => {
//   let service: OccOpfOrderAdapter;
//   let httpMock: HttpTestingController;
//   let converter: ConverterService;
//   let occEndpointsService: OccEndpointsService;
//   let httpClient: HttpClient;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         OccOpfOrderAdapter,
//         { provide: OccEndpointsService, useClass: MockOccEndpointsService },
//         ConverterService,
//       ],
//     });

//     service = TestBed.inject(OccOpfOrderAdapter);
//     httpMock = TestBed.inject(HttpTestingController);
//     httpClient = TestBed.inject(HttpClient);
//     converter = TestBed.inject(ConverterService);
//     occEndpointsService = TestBed.inject(OccEndpointsService);
//     spyOn(converter, 'pipeable').and.callThrough();
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should place an order successfully', () => {
//     const userId = 'testUserId';
//     const cartId = 'testCartId';
//     const termsChecked = true;

//     const mockResponse = {};
//     spyOn(httpClient, 'post').and.returnValue(defer(() => of(mockResponse)));

//     service.placeOpfOrder(userId, cartId, termsChecked).subscribe((result) => {
//       expect(result).toBe(mockResponse);
//     });

//     expect(httpClient.post).toHaveBeenCalledOnceWith(
//       'mock-url',
//       {},
//       jasmine.any(Object)
//     );
//     expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
//   });

//   it('should handle error during order placement', (done) => {
//     const userId = 'testUserId';
//     const cartId = 'testCartId';
//     const termsChecked = true;

//     spyOn(httpClient, 'post').and.returnValue(throwError(mock500Error));

//     service.placeOpfOrder(userId, cartId, termsChecked).subscribe({
//       error: (error) => {
//         expect(error).toEqual(normalizeHttpError(mock500Error));
//         done();
//       },
//     });
//   });

//   it('should add Content-Type to headers', () => {
//     const userId = 'anonymous';
//     const cartId = 'testCartId';
//     const termsChecked = true;

//     service.placeOpfOrder(userId, cartId, termsChecked).subscribe();

//     const req = httpMock.expectOne((request) => {
//       return (
//         request.method === 'POST' &&
//         request.headers.has('Content-Type') &&
//         request.headers.get('Content-Type') ===
//           'application/x-www-form-urlencoded'
//       );
//     });

//     req.flush({});
//   });

//   it('should retry on Jalo error and recover after the third retry', fakeAsync(() => {
//     let calledTimes = -1;

//     spyOn(httpClient, 'post').and.returnValue(
//       defer(() => {
//         calledTimes++;
//         if (calledTimes === 3) {
//           return of({} as Occ.Order);
//         }
//         return throwError(mockJaloError);
//       })
//     );

//     let result: Order | undefined;
//     const subscription = service
//       .placeOpfOrder('userId', 'cartId', true)
//       .subscribe((res) => (result = res));

//     tick(300); // 1*1*300 = 300
//     expect(result).toBeUndefined();

//     tick(1200); // 2*2*300 = 1200
//     expect(result).toBeUndefined();

//     tick(2700); // 3*3*300 = 2700
//     expect(result).toEqual({} as Order);

//     subscription.unsubscribe();
//   }));

//   it('should retry only 3 times on Jalo Error', fakeAsync(() => {
//     let retryCounter = 0;
//     spyOn(httpClient, 'post').and.returnValue(
//       defer(() => {
//         retryCounter++;
//         if (retryCounter < 3) {
//           return throwError(mockJaloError);
//         }
//         return of({} as Occ.Order);
//       })
//     );
//     const subscription = service
//       .placeOpfOrder('userId', 'cartId', true)
//       .subscribe();

//     tick(4800); // 4*4*300= 4800

//     expect(retryCounter).toEqual(3);

//     subscription.unsubscribe();
//   }));

//   it(`should retry only ${mock500ErrorRetry} times on 500 Error`, fakeAsync(() => {
//     let retryCounter = 0;
//     spyOn(httpClient, 'post').and.returnValue(
//       defer(() => {
//         retryCounter++;
//         if (retryCounter < mock500ErrorRetry) {
//           return throwError(mock500Error);
//         }
//         return of({} as Occ.Order);
//       })
//     );
//     const subscription = service
//       .placeOpfOrder('userId', 'cartId', true)
//       .subscribe();

//     tick(2700); // 3*3*300= 2700

//     expect(retryCounter).toEqual(2);

//     subscription.unsubscribe();
//   }));

//   it(`should retry on 500 error and recover after the ${mock500ErrorRetry} retry`, fakeAsync(() => {
//     let calledTimes = -1;

//     spyOn(httpClient, 'post').and.returnValue(
//       defer(() => {
//         calledTimes++;
//         if (calledTimes === mock500ErrorRetry) {
//           return of({} as Occ.Order);
//         }
//         return throwError(mock500Error);
//       })
//     );

//     let result: Order | undefined;
//     const subscription = service
//       .placeOpfOrder('userId', 'cartId', true)
//       .subscribe((res) => {
//         if (res) {
//           result = res;
//         }
//       });

//     tick(300); // 1*1*300 = 300
//     expect(result).toBeUndefined();

//     tick(1200); // 2*2*300 = 1200
//     expect(result).toEqual({} as Order);

//     subscription.unsubscribe();
//   }));

//   it('should unsuccessfully backOff on 500 error', fakeAsync(() => {
//     spyOn(httpClient, 'post').and.returnValue(throwError(mock500Error));

//     let result: HttpErrorModel | undefined;
//     const subscription = service
//       .placeOpfOrder('userId', 'cartId', true)
//       .subscribe({
//         error: (err) => (result = err),
//       });

//     tick(4800);
//     expect(result).toEqual(normalizeHttpError(mock500Error));

//     subscription.unsubscribe();
//   }));

//   it('should add client token header for anonymous users', () => {
//     const spy = spyOn(InterceptorUtil, 'createHeader').and.returnValue(
//       new HttpHeaders()
//     );

//     service.placeOpfOrder(OCC_USER_ID_ANONYMOUS, 'cartId', true).subscribe();

//     expect(spy).toHaveBeenCalledWith(
//       USE_CLIENT_TOKEN,
//       true,
//       jasmine.any(HttpHeaders)
//     );
//     httpMock.expectOne('anonymous').flush({});
//   });

//   it('should create the correct endpoint', () => {
//     const buildUrlSpy = spyOn(occEndpointsService, 'buildUrl').and.returnValue(
//       'mock-url'
//     );

//     service.placeOpfOrder('userId', 'cartId', true).subscribe();

//     expect(buildUrlSpy).toHaveBeenCalledWith('placeOpfOrder', {
//       urlParams: { userId: 'userId' },
//       queryParams: { cartId: 'cartId', termsChecked: 'true' },
//     });

//     httpMock.expectOne('mock-url').flush({});
//   });
// });
