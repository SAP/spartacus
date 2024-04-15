import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OccConfig, Priority } from '@spartacus/core';
import { CmsPageNotFoundServerErrorResponseFactory } from './cms-page-not-found-server-error-response-factory';

const mockOccConfig: OccConfig = {
  backend: {
    occ: {
      prefix: '/occ/v2/',
      baseUrl: 'https://localhost:9002',
      endpoints: { pages: 'cms/pages' },
    },
  },
};

const expectedUrl = `${mockOccConfig.backend?.occ?.baseUrl}${mockOccConfig.backend?.occ?.prefix}electronics-spa/${mockOccConfig.backend?.occ?.endpoints?.pages}`;

describe('CmsPageNotFoundServerErrorResponse', () => {
  let cmsPageNotFoundServerErrorResponse: CmsPageNotFoundServerErrorResponseFactory;
  let config: OccConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsPageNotFoundServerErrorResponseFactory,
        {
          provide: OccConfig,
          useValue: mockOccConfig,
        },
      ],
    });

    cmsPageNotFoundServerErrorResponse = TestBed.inject(
      CmsPageNotFoundServerErrorResponseFactory
    );
    config = TestBed.inject(OccConfig);
  });

  it('should return the priority', () => {
    expect(cmsPageNotFoundServerErrorResponse.getPriority()).toBe(Priority.LOW);
  });

  it('should match if error is an instance of HttpErrorResponse and URL starts with proper OCC endpoint including /cms/pages', () => {
    const error = new HttpErrorResponse({
      url: expectedUrl,
    });
    console.log('expectedUrl', expectedUrl);
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

  it('should return false if occConfig is not defined', () => {
    const error = new HttpErrorResponse({
      url: expectedUrl,
    });
    config.backend = { occ: undefined };

    expect(cmsPageNotFoundServerErrorResponse.hasMatch(error)).toBe(false);
  });

  it('should create the error', () => {
    const error = 'error';
    const result = cmsPageNotFoundServerErrorResponse.create(error);
    expect(result.message).toBe('CMS page not found');
    expect(result.cause).toBe(error);
  });
});
