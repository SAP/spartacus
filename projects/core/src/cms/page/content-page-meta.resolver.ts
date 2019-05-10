import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsService } from '../facade/cms.service';
import { Page, PageMeta } from '../model/page.model';
import { PageMetaResolver } from './page-meta.resolver';
import { PageBreadcrumbResolver, PageTitleResolver } from './page.resolvers';
import { PageType } from '../../model/cms.model';

@Injectable({
  providedIn: 'root',
})
export class ContentPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolve(): Observable<PageMeta> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap(page =>
        combineLatest([this.resolveTitle(page), this.resolveBreadcrumbs(page)])
      ),
      map(([title, breadcrumbs]) => ({ title, breadcrumbs }))
    );
  }

  resolveTitle(page: Page): Observable<string> {
    return of(page.title);
  }

  resolveBreadcrumbs(_page: Page): Observable<any[]> {
    // as long as we do not have CMSX-8689 in place
    // we need specific resolvers for nested pages
    return of([{ label: 'Home', link: '/' }]);
  }
}
