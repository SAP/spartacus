import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import {
  ANONYMOUS_CONSENT_NORMALIZER,
  CONSENT_TEMPLATE_NORMALIZER,
} from '@spartacus/user/anonymous-consents/core';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { OccUserAnonymousConsentsAdapter } from './occ-user-anonymous-consents.adapter';

describe('OccUserAnonymousConsentsAdapter', () => {
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;
  let adapter: OccUserAnonymousConsentsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUserAnonymousConsentsAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    adapter = TestBed.inject(OccUserAnonymousConsentsAdapter);
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadAnonymousConsentTemplates', () => {
    it('should load anonymous consent templates', () => {
      adapter.loadAnonymousConsentTemplates().subscribe().unsubscribe();
      httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'anonymousConsentTemplates'
      );
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        CONSENT_TEMPLATE_NORMALIZER
      );
    });
  });

  describe('loadAnonymousConsents', () => {
    it('should issue a HEAD request to load the latest anonymous consents', () => {
      adapter.loadAnonymousConsents().subscribe().unsubscribe();
      httpMock.expectOne((req) => req.method === 'HEAD');
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'anonymousConsentTemplates'
      );
      expect(converter.pipeable).toHaveBeenCalledWith(
        ANONYMOUS_CONSENT_NORMALIZER
      );
    });
  });
});
