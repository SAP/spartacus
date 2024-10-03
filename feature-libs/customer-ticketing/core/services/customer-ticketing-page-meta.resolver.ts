/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  PageHeadingResolver,
  BasePageMetaResolver,
  PageDescriptionResolver,
  PageMetaResolver,
  PageRobotsMeta,
  PageRobotsResolver,
  PageTitleResolver,
  PageType,
  TranslationService,
  PageBreadcrumbResolver,
  BreadcrumbMeta,
  SemanticPathService,
} from '@spartacus/core';
import { CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerTicketingPageMetaResolver
  extends PageMetaResolver
  implements
    PageHeadingResolver,
    PageBreadcrumbResolver,
    PageTitleResolver,
    PageDescriptionResolver,
    PageRobotsResolver
{
  protected readonly CUSTOMER_SERVICE_TRANSLATION_KEY =
    'customerTicketing.customerService';

  protected readonly CUSTOMER_SERVICE_SEMANTIC_ROUTE = 'supportTickets';

  constructor(
    protected translationService: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected basePageMetaResolver: BasePageMetaResolver,
    protected customerTicketingFacade: CustomerTicketingFacade,
    protected translation: TranslationService,
    protected semanticPath: SemanticPathService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageUid = 'support-ticket-details';
  }

  resolveTitle(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveTitle();
  }

  /**
   * @override
   * Resolves the page heading for the Customer Ticket Details Page.
   * The page heading is used in the UI (`<h1>`), where as the page
   * title is used by the browser and crawlers.
   */
  resolveHeading(): Observable<string | undefined> {
    return this.customerTicketingFacade
      .getTicket()
      .pipe(map((ticket) => ticket?.subject || ''));
  }

  resolveDescription(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveDescription();
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver.resolveRobots();
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.customerServiceBreadCrumb$,
      this.basePageMetaResolver.resolveBreadcrumbs(),
    ]).pipe(
      map(([customerServiceBreadCrumb, breadcrumbs = []]) => {
        const [home, ...restBreadcrumbs] = breadcrumbs;
        return [home, ...customerServiceBreadCrumb, ...restBreadcrumbs];
      })
    );
  }

  protected customerServiceBreadCrumb$: Observable<BreadcrumbMeta[]> =
    this.translation.translate(this.CUSTOMER_SERVICE_TRANSLATION_KEY).pipe(
      map((label) => [
        {
          label,
          link: this.semanticPath.get(this.CUSTOMER_SERVICE_SEMANTIC_ROUTE),
        },
      ])
    );
}
