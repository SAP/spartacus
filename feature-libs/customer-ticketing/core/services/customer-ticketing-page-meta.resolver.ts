/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
} from '@spartacus/core';
import { CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerTicketingPageMetaResolver
  extends PageMetaResolver
  implements
    PageHeadingResolver,
    PageTitleResolver,
    PageDescriptionResolver,
    PageRobotsResolver
{
  constructor(
    protected translationService: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected basePageMetaResolver: BasePageMetaResolver,
    protected customerTicketingFacade: CustomerTicketingFacade
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
}
