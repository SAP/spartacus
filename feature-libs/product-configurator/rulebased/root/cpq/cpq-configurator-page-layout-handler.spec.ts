import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { CpqConfiguratorPageLayoutHandler } from './cpq-configurator-page-layout-handler';

describe('CpqConfiguratorPageLayoutHandler', () => {
  let serviceUnderTest: CpqConfiguratorPageLayoutHandler;
  let slots$: Observable<string[]> = of(['a']);
  let pageTemplate = 'a';
  let section = 'c';

  beforeEach(() => {
    TestBed.configureTestingModule({});

    serviceUnderTest = TestBed.inject(
      CpqConfiguratorPageLayoutHandler as Type<CpqConfiguratorPageLayoutHandler>
    );
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should call getCpqAccessData endpoint', () => {
    serviceUnderTest.handle(slots$, pageTemplate, section);
    // serviceUnderTest.getCpqAccessData().subscribe();
    // const mockReq = httpMock.expectOne((req) => {
    //   return req.method === 'GET' && req.url === '/getCpqAccessData';
    // });
    // expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
    //   'getCpqAccessData'
    // );
    // expect(mockReq.cancelled).toBeFalsy();
    // expect(mockReq.request.responseType).toEqual('json');
    // mockReq.flush(accessData);
  });
});
