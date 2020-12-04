import { PageType } from '../../model/cms.model';

/**
 * The homepage id for the CMS homepage is not required when we query the backend.
 * CMS business users can have multiple pages, that they might switch quickly without
 * changing the page id. Therefore, we use a constant to keep track of the page in the
 * store, but are able to ignore the id while querying the backend.
 */
export const HOME_PAGE_ID = '__HOMEPAGE__';

export class PageContext {
  id: string;
  type?: PageType;

  constructor(id: string, type?: PageType) {
    this.id = id;
    this.type = type;
  }
}
