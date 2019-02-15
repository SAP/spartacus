import { Page } from '../../../cms/index';
import { Observable } from 'rxjs';

export abstract class PageTitleResolver {
  abstract hasMatch(page: Page): boolean;
  abstract resolve(): Observable<string>;
}
