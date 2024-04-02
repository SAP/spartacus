import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RequestCallback } from 'i18next-http-backend';
import { I18NEXT_HTTP_BACKEND_CLIENT } from './i18next-http-backend-client';

const testUrl = 'test/url';

describe('I18NEXT_HTTP_BACKEND_CLIENT', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let req: TestRequest;
  let testCallback: RequestCallback;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    spyOn(httpClient, 'get').and.callThrough();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const i18nextHttpBackendClient = TestBed.inject(
      I18NEXT_HTTP_BACKEND_CLIENT
    )!;
    testCallback = jasmine.createSpy('testCallback');

    i18nextHttpBackendClient({}, testUrl, {}, testCallback);

    req = httpMock.expectOne({ url: testUrl, method: 'GET' });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should use Angular's HttpClient", () => {
    expect(httpClient.get).toHaveBeenCalledWith(testUrl, jasmine.any(Object));
  });

  it('should request for responseType text', () => {
    expect(req.request.responseType).toBe('text');
  });

  it('should forward a success response to i18next callback', () => {
    req.flush('testResponse');

    expect(testCallback).toHaveBeenCalledWith(null, {
      status: 200,
      data: 'testResponse',
    });
  });

  it('should forward a failure response to i18next callback', () => {
    const error = 'test error message';
    const statusText = 'Not Found';
    const status = 404;
    const expectedHttpErrorResponse = new HttpErrorResponse({
      status,
      error,
      statusText,
      url: testUrl,
    });

    req.flush(error, {
      status,
      statusText,
    });
    expect(testCallback).toHaveBeenCalledWith(expectedHttpErrorResponse, {
      status,
      // a workaround for https://github.com/i18next/i18next-http-backend/issues/82
      data: null as any,
    });
  });
});
