import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { CmsService } from '../facade/cms.service';
import { Page, PageMeta } from '../model/page.model';
import { PageMetaResolver } from './page-meta.resolver';
import { PageBreadcrumbResolver, PageTitleResolver } from './page.resolvers';

@Injectable({
  providedIn: 'root',
})
export class ContentPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  constructor(
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolve(): Observable<PageMeta> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap((page: Page) =>
        combineLatest([
          this.resolveTitle(page),
          this.resolveBreadcrumbLabel().pipe(
            switchMap(label => this.resolveBreadcrumbs(page, label))
          ),
        ])
      ),
      map(([title, breadcrumbs]) => ({ title, breadcrumbs }))
    );
  }

  resolveTitle(page: Page): Observable<string> {
    return of(page.title);
  }

  resolveBreadcrumbLabel(): Observable<string> {
    return this.translation.translate('common.home');
  }

  resolveBreadcrumbs(_page: Page, breadcrumbLabel: string): Observable<any[]> {
    // as long as we do not have CMSX-8689 in place
    // we need specific resolvers for nested pages
    return of([{ label: breadcrumbLabel, link: '/' }]);
  }
}
