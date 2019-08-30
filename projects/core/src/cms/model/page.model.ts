import { CmsComponent } from '../../model/cms.model';
import { ContentSlotData } from './content-slot-data.model';

export interface Page {
  pageId?: string;
  name?: string;
  type?: string;
  title?: string;
  template?: string;
  loadTime?: number;
  slots: { [key: string]: ContentSlotData };
  properties?: any;
  label?: string;
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
   * the page heading is typically used in the UI
   */
  heading?: string;

  /**
   * the page description is used in the Search Engine Result Page
   */
  description?: string;

  /**
   * the robots information drives search engines to index the page and
   * follow links in the page
   */
  robots?: PageRobotsMeta[];

  /**
   * image that can be added to the og:image metatag
   */
  image?: string;

  /**
   * the list of breadcrumbs that can be rendered in the page UI.
   */
  breadcrumbs?: any[];
}

export enum PageRobotsMeta {
  INDEX = 'INDEX',
  NOINDEX = 'NOINDEX',
  FOLLOW = 'FOLLOW',
  NOFOLLOW = 'NOFOLLOW',
}
