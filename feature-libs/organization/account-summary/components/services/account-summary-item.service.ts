import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryItemService {
  constructor(protected routingService: RoutingService) {}

  launchDetails(item: B2BUnit): void {
    const detailsPageRoute = this.getDetailsRoute();
    if (detailsPageRoute && item && Object.keys(item).length > 0) {
      this.routingService.go({
        cxRoute: detailsPageRoute,
        params: item,
      });
    }
  }

  protected getDetailsRoute(): string {
    return 'orgAccountSummaryDetails';
  }
}
