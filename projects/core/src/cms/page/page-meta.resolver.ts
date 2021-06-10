import { PageType } from '../../model/cms.model';
import { Applicable } from '../../util/applicable';
import { Page } from '../model/page.model';

/**
 * Abstract class that can be used to resolve meta data for specific pages.
 * The `getScore` method is used to select the right resolver for a specific
 * page, based on a score. The score is calculated by the (non)matching page
 * type and page template.
 */
export abstract class PageMetaResolver implements Applicable {
  /** The `PageType` is used to score the (non)matching page */
  pageType: PageType;

  /** The page template is used to score the (non)matching page template */
  pageTemplate: string;

  /** The semantic route is used to score the (non)matching page template */
  semanticRoute?: string;

  /**
   * Returns the matching score for a resolver class, based on
   * the page type and page template.
   */
  getScore(page: Page, semanticRoute?: string): number {
    let score = 0;
    if (this.pageType) {
      score += page.type === this.pageType ? 1 : -1;
    }
    if (this.pageTemplate) {
      score += page.template === this.pageTemplate ? 1 : -1;
    }
    if (this.semanticRoute) {
      score += semanticRoute === this.semanticRoute ? 1 : -1;
    }

    return score;
  }

  hasMatch(page: Page, semanticRoute?: string): boolean {
    return this.getScore(page, semanticRoute) > 0;
  }

  getPriority(page: Page, semanticRoute?: string): number {
    return this.getScore(page, semanticRoute);
  }
}
