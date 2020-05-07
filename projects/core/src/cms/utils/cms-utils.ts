import { PageType } from '../../model/cms.model';
import { PageContext } from '../../routing/models/page-context.model';

export const CURRENT_CONTEXT_KEY = 'current';

/**
 *
 * Serializes the provided page context.
 * The pattern used for serialization is: `pageContext.type-pageContext.id`.
 *
 * @param pageContext to serialize
 * @param ignoreContentPageId if set to true, and the PageType is of type ContentPage, then the serialized page context will not contain the ID.
 * Otherwise, the page context if fully serialized.
 */
export function serializePageContext(
  pageContext: PageContext,
  ignoreContentPageId?: boolean
): string {
  if (!pageContext) {
    return CURRENT_CONTEXT_KEY;
  }

  if (ignoreContentPageId && pageContext.type === PageType.CONTENT_PAGE) {
    return `${pageContext.type}`;
  }

  return `${pageContext.type}-${pageContext.id}`;
}
