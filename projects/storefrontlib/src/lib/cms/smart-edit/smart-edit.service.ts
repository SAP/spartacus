import { Injectable } from '@angular/core';

import { RoutingService, CmsService } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmartEditService {
  private _cmsTicketId: string;

  constructor(
    private cmsService: CmsService,
    private routingService: RoutingService
  ) {
    this.getCmsTicket();
    this.addPageContract();
  }

  get cmsTicketId(): string {
    return this._cmsTicketId;
  }

  protected getCmsTicket() {
    combineLatest(
      this.cmsService.getCurrentPage(),
      this.routingService.getRouterState()
    )
      .pipe(takeWhile(([cmsPage]) => cmsPage === undefined))
      .subscribe(([, routerState]) => {
        if (routerState.state && !this._cmsTicketId) {
          this._cmsTicketId = routerState.state.queryParams['cmsTicketId'];
        }
      });
  }

  protected addPageContract() {
    this.cmsService.getCurrentPage().subscribe(cmsPage => {
      if (cmsPage && this._cmsTicketId !== undefined) {
        const previousContract = [];
        Array.from(document.body.classList).forEach(attr =>
          previousContract.push(attr)
        );
        previousContract.forEach(attr => document.body.classList.remove(attr));

        document.body.classList.add(`smartedit-page-uid-${cmsPage.pageId}`);
        document.body.classList.add(`smartedit-page-uuid-${cmsPage.uuid}`);
        document.body.classList.add(
          `smartedit-catalog-version-uuid-${cmsPage.catalogUuid}`
        );
      }
    });
  }
}
