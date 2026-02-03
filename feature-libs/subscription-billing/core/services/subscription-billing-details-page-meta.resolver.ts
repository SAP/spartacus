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
export class SubscriptionBillingDetailsPageMetaResolver
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
    this.pageUid = 'subscription-bill-details';
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
      this.translation.translate(
        'subscriptionPageBreadcrumb.subscriptionBills'
      ),
    ]).pipe(
      map(([homeLabel, subscriptionBillsLabel]) => {
        return [
          { label: homeLabel, link: '/' },
          {
            label: subscriptionBillsLabel,
            link: '/my-account/subscription-bills',
          },
        ];
      })
    );
  }
}
