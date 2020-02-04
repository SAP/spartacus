import { HttpErrorResponse } from '@angular/common/http';
import { isObject } from '../config/utils/deep-merge';
import { PageType } from '../model';
import { ErrorModel, HttpErrorModel } from '../model/misc.model';
import { PageContext } from '../routing/models/page-context.model';

export const CURRENT_CONTEXT_KEY = 'current';

export const UNKNOWN_ERROR = {
  error: 'unknown error',
};

const circularReplacer = () => {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export function makeErrorSerializable(
  error: HttpErrorResponse | ErrorModel | any
): HttpErrorModel | Error | any {
  if (error instanceof Error) {
    return {
      message: error.message,
      type: error.name,
      reason: error.stack,
    } as ErrorModel;
  }

  if (error instanceof HttpErrorResponse) {
    let serializableError = error.error;
    if (isObject(error.error)) {
      serializableError = JSON.stringify(error.error, circularReplacer());
    }

    return {
      message: error.message,
      error: serializableError,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
    } as HttpErrorModel;
  }

  return isObject(error) ? UNKNOWN_ERROR : error;
}

/**
 *
 * Fully serializes the provided page context.
 * The pattern used for serialization is: `pageContext.type-pageContext.id`.
 *
 * This method is useful for grouping streams by page context.
 *
 * @param pageContext to serialize
 */
export function serializePageContext(pageContext: PageContext): string {
  if (!pageContext) {
    return CURRENT_CONTEXT_KEY;
  }

  return `${pageContext.type}-${pageContext.id}`;
}

/**
 * Serializes the provided page context in a suitable way for the Spartacus' state.
 *
 * This means that the method will not append the provided page context's ID if it's of type CONTENT_PAGE.
 * Otherwise, `serializePageContext()` will be used.
 *
 * @param pageContext to serialize
 */
export function serializePageContextForState(pageContext: PageContext): string {
  if (!pageContext) {
    return CURRENT_CONTEXT_KEY;
  }

  if (pageContext.type === PageType.CONTENT_PAGE) {
    return `${pageContext.type}`;
  }

  return serializePageContext(pageContext);
}
