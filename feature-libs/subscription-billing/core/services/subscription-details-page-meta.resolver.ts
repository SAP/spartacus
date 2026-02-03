import { Injectable } from '@angular/core';
import {
  PageMetaResolver,
  PageBreadcrumbResolver,
  TranslationService,
  PageType,
  BreadcrumbMeta,
  PageDescriptionResolver,
  PageHeadingResolver,
  PageTitleResolver,
  BasePageMetaResolver,
} from '@spartacus/core';
import { combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionDetailsPageMetaResolver
  extends PageMetaResolver
  implements
    PageHeadingResolver,
    PageTitleResolver,
    PageDescriptionResolver,
    PageBreadcrumbResolver
{
  constructor(
    protected basePageMetaResolver: BasePageMetaResolver,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'AccountPageTemplate';
    this.pageUid = 'subscription-details';
  }

  resolveHeading(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveTitle();
  }

  resolveTitle(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveTitle();
  }

  resolveDescription(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveDescription();
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined> {
    return combineLatest([
      this.translation.translate('subscriptionPageBreadcrumb.home'),
      this.translation.translate('subscriptionPageBreadcrumb.subscriptions'),
    ]).pipe(
      map(([homeLabel, subscriptionsLabel]) => {
        return [
          { label: homeLabel, link: '/' },
          {
            label: subscriptionsLabel,
            link: '/my-account/subscriptions',
          },
        ];
      })
    );
  }
}
