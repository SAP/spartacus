import { TestBed, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import createSpy = jasmine.createSpy;
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { GlobalMessageService } from '../facade/global-message.service';
import { GlobalMessageType } from './../models/message.model';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

describe('HttpErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let mockMessageService: any;

  beforeEach(() => {
    mockMessageService = {
      add: createSpy(),
      remove: createSpy()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        },
        { provide: GlobalMessageService, useValue: mockMessageService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should catch 400 error`, inject([HttpClient], (http: HttpClient) => {
    const url = OAUTH_ENDPOINT;
    const params = new HttpParams()
      .set('refresh_token', 'some_token')
      .set('grant_type', 'password'); // authorization_code, client_credentials, password
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    http
      .post(url, params, { headers })
      .pipe(catchError((error: any) => throwError(error)))
      .subscribe(_result => {}, error => (this.error = error));

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'POST' && req.url === url;
    });

    mockReq.flush(
      {
        error: 'invalid_grant',
        error_description: 'Bad credentials'
      },
      { status: 400, statusText: 'Error' }
    );
    expect(mockMessageService.add).toHaveBeenCalledWith({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'Bad credentials. Please login again.'
    });
    expect(mockMessageService.remove).toHaveBeenCalledWith(
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }));

  it(`should catch 403 of error`, inject([HttpClient], (http: HttpClient) => {
    http
      .get('/test')
      .pipe(catchError((error: any) => throwError(error)))
      .subscribe(_result => {}, error => (this.error = error));

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET';
    });

    mockReq.flush({}, { status: 403, statusText: 'Fobidden' });
    expect(mockMessageService.add).toHaveBeenCalledWith({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'You are not authorized to perform this action.'
    });
  }));

  it(`should catch 404 of error`, inject([HttpClient], (http: HttpClient) => {
    http
      .get('/test')
      .pipe(catchError((error: any) => throwError(error)))
      .subscribe(_result => {}, error => (this.error = error));

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET';
    });

    mockReq.flush({}, { status: 404, statusText: 'Not Found' });
    expect(mockMessageService.add).toHaveBeenCalledWith({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'The requested resource could not be found'
    });
  }));

  it(`should catch 409 of error`, inject([HttpClient], (http: HttpClient) => {
    http
      .get('/test')
      .pipe(catchError((error: any) => throwError(error)))
      .subscribe(_result => {}, error => (this.error = error));

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET';
    });

    mockReq.flush({}, { status: 409, statusText: 'Already Exists' });
    expect(mockMessageService.add).toHaveBeenCalledWith({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'Already exists'
    });
  }));

  it(`should catch 502 of error`, inject([HttpClient], (http: HttpClient) => {
    http
      .get('/test')
      .pipe(catchError((error: any) => throwError(error)))
      .subscribe(_result => {}, error => (this.error = error));

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET';
    });

    mockReq.flush({}, { status: 502, statusText: 'Bad Gateway' });
    expect(mockMessageService.add).toHaveBeenCalledWith({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'A server error occurred. Please try again later.'
    });
  }));

  it(`should catch 504 of error`, inject([HttpClient], (http: HttpClient) => {
    http
      .get('/test')
      .pipe(catchError((error: any) => throwError(error)))
      .subscribe(_result => {}, error => (this.error = error));

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET';
    });

    mockReq.flush({}, { status: 504, statusText: 'Gateway Timeout' });
    expect(mockMessageService.add).toHaveBeenCalledWith({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'The server did not responded, please try again later.'
    });
  }));
});
