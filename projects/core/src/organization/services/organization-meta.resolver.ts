import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { BreadcrumbMeta } from '../../cms/model/page.model';
import {
  PageBreadcrumbResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { ContentPageMetaResolver } from '../../cms/page/content-page-meta.resolver';

/**
 * Resolves the page data for Organization Pages.
 *
 * Breadcrumbs are built in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class OrganizationMetaResolver extends ContentPageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  constructor(
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super(cms, translation);
    this.pageTemplate = 'CompanyPageTemplate';
  }

  protected ORGANIZATION_ROOT_PATH = 'organization';

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      super.resolveBreadcrumbs(),
      this.translation.translate(`breadcrumbs.${this.ORGANIZATION_ROOT_PATH}`),
    ]).pipe(
      map(([breadcrumb, organizationLabel]: [BreadcrumbMeta[], string]) =>
        breadcrumb.concat([
          {
            label: organizationLabel,
            link: `/${this.ORGANIZATION_ROOT_PATH}`,
          },
        ])
      )
    );
  }
}
