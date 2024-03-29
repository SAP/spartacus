import { Provider } from '@angular/core';
import { CmsPageNotFoundServerErrorResponseTransformer } from './cms-page-not-found-server-error-response-transformer';
import { UnknownServerErrorResponseTransformer } from './unknown-server-error-response-transformer';
import { SERVER_ERROR_RESPONSE_TRANSFORMERS } from './server-error-response-transformers';

/**
 * This file provides the default server error response transformers.
 */
export const provideServerErrorResponseTransformers = (): Provider[] => [
  {
    provide: SERVER_ERROR_RESPONSE_TRANSFORMERS,
    useExisting: CmsPageNotFoundServerErrorResponseTransformer,
    multi: true,
  },
  {
    provide: SERVER_ERROR_RESPONSE_TRANSFORMERS,
    useExisting: UnknownServerErrorResponseTransformer,
    multi: true,
  },
];
