import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { PageType } from '../../occ/occ-models/occ.models';
import { CmsService } from '../facade/cms.service';
import { PageMetaResolver } from './page-meta.resolver';
import { PageMeta, Page } from '../model/page.model';
import { PageTitleResolver } from './page.resolvers';

@Injectable({
  providedIn: 'root',
})
export class ContentPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolve(): Observable<PageMeta> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap(page => this.resolveTitle(page)),
      map((title): PageMeta => ({ title }))
    );
  }

  resolveTitle(page: Page): Observable<string> {
    return of(page.title);
  }
}
