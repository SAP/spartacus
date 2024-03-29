import { Priority } from '@spartacus/core';
import { CmsPageNotFoundServerErrorResponseTransformer } from './cms-page-not-found-server-error-response-transformer';
import { HttpErrorResponse } from '@angular/common/http';

describe('CmsPageNotFoundServerErrorResponse', () => {
  let cmsPageNotFoundServerErrorResponse: CmsPageNotFoundServerErrorResponseTransformer;

  beforeEach(() => {
    cmsPageNotFoundServerErrorResponse =
      new CmsPageNotFoundServerErrorResponseTransformer();
  });

  it('should return the priority', () => {
    expect(cmsPageNotFoundServerErrorResponse.getPriority()).toBe(
      Priority.NORMAL
    );
  });

  it('should match if error is type of HttpErrorResponse and includes "cms/pages" in URL', () => {
    const error = {
      headers: {},
      url: 'https://localhost:9002/rest/v2/cms/pages',
    } as HttpErrorResponse;
    expect(cmsPageNotFoundServerErrorResponse.hasMatch(error)).toBe(true);
  });

  it('should not match if error is not type of HttpErrorResponse', () => {
    const error = {
      url: 'https://localhost:9002/rest/v2/cms/pages',
    };
    expect(cmsPageNotFoundServerErrorResponse.hasMatch(error)).toBe(false);
  });

  it('should not match if URL does not contain "cms/pages" string', () => {
    const error = {
      url: 'https://localhost:9002/rest/v2/cms/pages',
    };
    expect(cmsPageNotFoundServerErrorResponse.hasMatch(error)).toBe(false);
  });

  it('should transform the error', () => {
    const error = 'error';
    const result = cmsPageNotFoundServerErrorResponse.transform(error);
    expect(result.data?.message).toBe('CMS page not found');
    expect(result.data?.originalError).toBe(error);
  });
});
