import { PageContext } from '../../routing/models/page-context.model';
export declare const CURRENT_CONTEXT_KEY = "current";
/**
 *
 * Serializes the provided page context.
 * The pattern used for serialization is: `pageContext.type-pageContext.id`.
 *
 * @param pageContext to serialize
 * @param ignoreContentPageId if set to true, and the PageType is of type ContentPage, then the serialized page context will not contain the ID.
 * Otherwise, the page context if fully serialized.
 */
export declare function serializePageContext(pageContext: PageContext | undefined, ignoreContentPageId?: boolean): string;
