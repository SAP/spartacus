import { OccConfig, OccEndpointsService, Priority } from '@spartacus/core';
import { CmsPageNotFoundServerErrorResponseTransformer } from './cms-page-not-found-server-error-response-transformer';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

const mockOccConfig: OccConfig = {
  backend: {
    occ: {
      prefix: 'occ/v2',
      baseUrl: 'https://localhost:9002',
      endpoints: { pages: 'cms/pages' },
    },
  },
};

const expectedUrl = `${mockOccConfig.backend?.occ?.baseUrl}/${mockOccConfig.backend?.occ?.prefix}/${mockOccConfig.backend?.occ?.endpoints?.pages}`;

describe('CmsPageNotFoundServerErrorResponse', () => {
  let cmsPageNotFoundServerErrorResponse: CmsPageNotFoundServerErrorResponseTransformer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsPageNotFoundServerErrorResponseTransformer,
        OccEndpointsService,
        {
          provide: OccConfig,
          useValue: mockOccConfig,
        },
      ],
    });

    cmsPageNotFoundServerErrorResponse = TestBed.inject(
      CmsPageNotFoundServerErrorResponseTransformer
    );
  });

  it('should return the priority', () => {
    expect(cmsPageNotFoundServerErrorResponse.getPriority()).toBe(Priority.LOW);
  });

  it('should match if error is an instance of HttpErrorResponse and URL starts with proper OCC endpoint including /cms/pages', () => {
    const error = new HttpErrorResponse({
      url: expectedUrl,
    });
    expect(cmsPageNotFoundServerErrorResponse.hasMatch(error)).toBe(true);
  });

  it('should not match if error is not type of HttpErrorResponse', () => {
    const error = {
      url: expectedUrl,
    };
    expect(cmsPageNotFoundServerErrorResponse.hasMatch(error)).toBe(false);
  });

  it('should not match if URL does not start with proper OCC url including /cms/pages string', () => {
    const unexpectedUrl = `${mockOccConfig.backend?.occ?.baseUrl}/${mockOccConfig.backend?.occ?.prefix}/unexpected`;
    const error = new HttpErrorResponse({
      url: unexpectedUrl,
    });
    expect(cmsPageNotFoundServerErrorResponse.hasMatch(error)).toBe(false);
  });

  it('should transform the error', () => {
    const error = 'error';
    const result = cmsPageNotFoundServerErrorResponse.transform(error);
    expect(result.data?.message).toBe('CMS page not found');
    expect(result.data?.cause).toBe(error);
  });
});
