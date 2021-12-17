import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MultiCartService, RoutingService } from '@spartacus/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CheckoutCartInterceptor } from './checkout-cart.interceptor';

const cartNotFoundStatus = { status: 400, statusText: 'Error' };
const cartNotFoundError = {
  errors: [
    {
      type: 'CartError',
      message: 'Cart not found',
      reason: 'notFound',
      subject: '123',
    },
  ],
};

class MockRoutingService {
  go() {}

  getRouterState() {
    return of();
  }
}

class MultiCartServiceStub {
  reloadCart() {}
}

describe('CheckoutCartInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let routingService: RoutingService;
  let multiCartService: MultiCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CheckoutCartInterceptor,
          multi: true,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: MultiCartService, useClass: MultiCartServiceStub },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    routingService = TestBed.inject(RoutingService);
    multiCartService = TestBed.inject(MultiCartService);

    spyOn(routingService, 'go');
    spyOn(multiCartService, 'reloadCart');
  });

  describe('intercept', () => {
    it('should redirect to cart page if the cart is not found', () => {
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({ state: { semanticRoute: 'checkoutDelivery' } } as any)
      );

      const mockReq = createRequest();

      mockReq.flush(cartNotFoundError, cartNotFoundStatus);

      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
      expect(multiCartService.reloadCart).toHaveBeenCalledWith('123');
    });

    it('should NOT do anything if the route is not part of checkout', () => {
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({ state: { semanticRoute: 'orderConfirmation' } } as any)
      );

      const mockReq = createRequest();

      mockReq.flush(cartNotFoundError, cartNotFoundStatus);

      expect(routingService.go).not.toHaveBeenCalled();
      expect(multiCartService.reloadCart).not.toHaveBeenCalled();
    });

    it('should NOT reload cart if there is no subject', () => {
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({ state: { semanticRoute: 'checkoutDelivery' } } as any)
      );

      const mockReq = createRequest();

      mockReq.flush(
        {
          errors: [
            {
              type: 'CartError',
              message: 'Cart not found',
              reason: 'notFound',
            },
          ],
        },
        cartNotFoundStatus
      );

      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
      expect(multiCartService.reloadCart).not.toHaveBeenCalled();
    });

    it('should NOT do anything if the error is not 400', () => {
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({ state: { semanticRoute: 'checkoutDelivery' } } as any)
      );

      const mockReq = createRequest();

      mockReq.flush(cartNotFoundError, { status: 404, statusText: 'Error' });

      expect(routingService.go).not.toHaveBeenCalled();
      expect(multiCartService.reloadCart).not.toHaveBeenCalled();
    });
  });

  function createRequest(): TestRequest {
    http
      .get('/test')
      .pipe(catchError((error: any) => throwError(error)))
      .subscribe(
        (_result) => {},
        (_error) => {}
      );

    return httpMock.expectOne((req) => {
      return req.method === 'GET';
    });
  }
});
