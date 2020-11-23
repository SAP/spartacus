import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CpqConfiguratorRestInterceptor } from './cpq-configurator-rest.interceptor';

describe('CpqConfiguratorRestInterceptor', () => {
  let interceptorUnderTest: CpqConfiguratorRestInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CpqConfiguratorRestInterceptor],
    });

    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );

    interceptorUnderTest = TestBed.inject(
      CpqConfiguratorRestInterceptor as Type<CpqConfiguratorRestInterceptor>
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service', () => {
    expect(interceptorUnderTest).toBeDefined();
  });
});
