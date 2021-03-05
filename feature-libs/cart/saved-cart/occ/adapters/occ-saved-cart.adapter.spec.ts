import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { OccSavedCartAdapter } from './occ-saved-cart.adapter';

class MockOccEndpointsService implements Partial<OccEndpointsService> {}

describe('OccSavedCartAdapter', () => {
  let adapter: OccSavedCartAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSavedCartAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.inject(ConverterService);
    adapter = TestBed.inject(OccSavedCartAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(converterService, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });
});
