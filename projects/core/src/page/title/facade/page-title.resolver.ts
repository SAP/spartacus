import { Page } from '../../../cms/model/page.model';
import { Observable } from 'rxjs';

export abstract class PageTitleResolver {
  abstract hasMatch(page: Page): boolean;
  abstract resolve(): Observable<string>;
}
