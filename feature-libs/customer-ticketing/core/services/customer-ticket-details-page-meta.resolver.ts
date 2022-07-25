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
import { CustomerTicketingService } from 'feature-libs/customer-ticketing/components/customer-ticketing.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerTicketDetailsPageMetaResolver
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
    protected customerTicketingService: CustomerTicketingService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    // need to add one more validation to reflect changes just on customer ticket details page
    // either by introducing a new page template or adding a check for page url
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
  resolveHeading(): Observable<string> {
    // return this.translationService.translate('pageMetaResolver.checkout.title');
    // return heading ? of(heading) : this.translationService.translate('');
    return this.customerTicketingService.getTciketSubject();
  }

  resolveDescription(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveDescription();
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver.resolveRobots();
  }
}
