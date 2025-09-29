import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

/**
 * This interceptor is used to mock HTTP responses for specific API endpoints.
 * 
 * It intercepts HTTP requests and returns mock data for the defined endpoints,
 * while allowing other requests to pass through unmodified.
 * 
 * To use this interceptor, provide it in your Angular module's providers array.
 * Example ([in app.module.ts](https://github.com/SAP/spartacus/blob/20b375201f22ecdff1ad850bccbae763969102a5/projects/storefrontapp/src/app/app.module.ts#L68)):
 * {
 *  provide: HTTP_INTERCEPTORS,
 *  useExisting: MockInterceptor,
 *  multi: true,
 * }
 */
@Injectable({ providedIn: 'root' })
export class MockInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Define the API endpoint you want to mock
    const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';
    const mockUrl = OAUTH_ENDPOINT;

    if (req.url.endsWith(mockUrl)) {
      // Return mock data as an HTTP response
      const mockResponse = new HttpErrorResponse({
        status: 400,
        error: {
          error : "invalid_grant",
          // error_description: "Bad credentials",
          error_description : "Password expired for the user: John Doe"
        },
        url: req.url,
      });
      // Use throwError to simulate an error response
      return throwError(() => mockResponse);
    }

    // Pass through other requests unmodified
    return next.handle(req);
  }
}