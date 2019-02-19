import { Observable } from 'rxjs';
import { PageType } from '../../occ';
import { Page } from 'projects/core/src/cms';

export abstract class PageTitleResolver {
  abstract resolve(): Observable<string>;

  constructor(protected pageType?: PageType, protected pageTemplate?: string) {}

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
