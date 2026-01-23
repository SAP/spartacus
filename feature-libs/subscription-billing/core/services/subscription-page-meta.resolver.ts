import { Injectable } from '@angular/core';
import {
  PageMetaResolver,
  PageTitleResolver,
  PageDescriptionResolver,
  PageBreadcrumbResolver,
  PageRobotsResolver,
  BasePageMetaResolver,
  ProductService,
  RoutingService,
  TranslationService,
  PageType,
  PageRobotsMeta,
  BreadcrumbMeta,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionPageMetaResolver
  extends PageMetaResolver
  implements
    PageTitleResolver,
    PageDescriptionResolver,
    PageBreadcrumbResolver,
    PageRobotsResolver
{
  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService,
    protected translation: TranslationService,
    protected basePageMetaResolver: BasePageMetaResolver,
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'AccountPageTemplate';
    console.log('Page ID:', this.pageUid);
  }

  resolveTitle(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveTitle();
  }

  resolveDescription(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveDescription();
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined> {
    return of([
      { label: 'Home', link: '/' },
      { label: 'My Account' },
      { label: 'Subscriptions Bills', link: '/my-account/subscriptions' },
    ]);
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver.resolveRobots();
  }
}
