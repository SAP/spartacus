import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mock_pdp } from './mock';

@Injectable()
export class MockResponseInterceptor implements HttpInterceptor {
  //http://localhost:4200/electronics-spa/en/USD/product/898503/1v
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request URL matches the pattern and contains required query parameters
    if (
      req.url.includes('898503') &&
      req.url.includes('sapPricePlan,sapSubscriptionTerm')
    ) {
      const mockResponse = mock_pdp;

      // Return the mocked response
      return of(new HttpResponse({ status: 200, body: mockResponse }));
    }

    // If conditions don't match, proceed with the original request
    return next.handle(req);
  }
}
