import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ANONYMOUS_CONSENT_NORMALIZER } from '../../../anonymous-consents/connectors/converters';
import { CONSENT_TEMPLATE_NORMALIZER } from '../../../user/index';
import { ConverterService } from '../../../util/index';
import { OccEndpointsService } from '../../services';
import { OccAnonymousConsentTemplatesAdapter } from './occ-anonymous-consent-templates.adapter';
import { MockOccEndpointsService } from './unit-test.helper';

describe('OccAnonymousConsentTemplatesAdapter', () => {
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;
  let adapter: OccAnonymousConsentTemplatesAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccAnonymousConsentTemplatesAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    adapter = TestBed.inject(OccAnonymousConsentTemplatesAdapter);
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
