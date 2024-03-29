import { InjectionToken } from '@angular/core';
import { Applicable } from '@spartacus/core';
import { CxServerError } from '../server-errors';

/**
 * A transformer responsible for transforming an error into a {@link CxServerError}.
 * The transformer is applicable when the error matches the transformer's criteria.
 * Spartacus provides two default transformers:
 * - {@link CmsPageNotFoundServerErrorResponseTransformer}
 * - {@link UnknownServerErrorResponseTransformer}
 */
export interface ServerErrorResponseTransformer extends Applicable {
  transform(error: unknown): CxServerError;
}

/**
 * Injection token for server error response transformers.
 */
export const SERVER_ERROR_RESPONSE_TRANSFORMERS = new InjectionToken<
  ServerErrorResponseTransformer[]
>('SERVER_ERROR_RESPONSE_TRANSFORMERS');
