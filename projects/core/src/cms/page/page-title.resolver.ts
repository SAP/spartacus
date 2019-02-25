import { Observable } from 'rxjs';
import { PageType } from '../../occ';
import { Page } from '../model/page.model';

export abstract class PageTitleResolver {
  pageType: PageType;
  pageTemplate: string;

  abstract resolve(): Observable<string>;

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
