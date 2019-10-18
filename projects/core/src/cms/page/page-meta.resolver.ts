import { Observable } from 'rxjs';
import { PageType } from '../../model/cms.model';
import { Page, PageMeta } from '../model/page.model';

export abstract class PageMetaResolver {
  pageType: PageType;
  pageTemplate: string;

  /**
   * The resolve method is no longer preferred and will be removed with release 2.0.
   * The caller `PageMetaService` service is improved to expect all individual resolvers
   * instead, so that the code is easier extensible.
   *
   * @deprecated since version 1.3
   */
  abstract resolve(): Observable<PageMeta>;

  getScore(page: Page): number {
    let score = 0;

    if (this.pageType) {
      score += page.type === this.pageType ? 1 : -1;
    }
    if (this.pageTemplate) {
      score += page.template === this.pageTemplate ? 1 : -1;
    }
    return score;
  }
}
