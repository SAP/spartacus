import { Page } from '../../../cms';
import { Observable } from 'rxjs';

export abstract class PageTitleResolver {
  abstract hasMatch(page: Page): boolean;
  abstract resolve(): Observable<string>;
}
