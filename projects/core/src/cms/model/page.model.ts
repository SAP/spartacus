import { CmsComponent } from '../../model/cms.model';
import { ContentSlotData } from './content-slot-data.model';

export interface Page {
  pageId?: string;
  name?: string;
  description?: string;
  type?: string;
  title?: string;
  template?: string;
  loadTime?: number;
  slots?: { [key: string]: ContentSlotData };
  properties?: any;
  label?: string;

  /**
   * Lists the page robot information for the given page: `INDEX`, `NOINDEX`, `FOLLOW` or `NOFOLLOW`
   */
  robots?: PageRobotsMeta[];
}

/**
 * Represents the cms structure for pages, slots and components.
 */
export interface CmsStructureModel {
  page?: Page;
  components?: CmsComponent[];
}

/**
 * Represents the page meta data that can be used
 * to resolve page data and seo related data.
 */
export interface PageMeta {
  /**
   * the page title is used for the page title tag which
   * is visible in the browser navigation as well as in the
   * Search Engine Result Page
   */
  title?: string;

  /**
   * The page heading is typically used in the UI.
   */
  heading?: string;

  /**
   * The page description is used in the Search Engine Result Page.
   */
  description?: string;

  /**
   * The robots information drives search engines to index the page and
   * follow links in the page.
   */
  robots?: PageRobotsMeta[];

  /**
   * Image that can be added to the og:image metatag.
   */
  image?: string;

  /**
   * The list of breadcrumbs that can be rendered in the page UI.
   */
  breadcrumbs?: BreadcrumbMeta[];

  /**
   * The canonical URL us used to avoid duplicates of the page being indexed by crawlers.
   */
  canonicalUrl?: string;
}

export interface BreadcrumbMeta {
  label: string;
  link: string;
}

export enum PageRobotsMeta {
  INDEX = 'INDEX',
  NOINDEX = 'NOINDEX',
  FOLLOW = 'FOLLOW',
  NOFOLLOW = 'NOFOLLOW',
}
