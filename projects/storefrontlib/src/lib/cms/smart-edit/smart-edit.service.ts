import { Injectable } from '@angular/core';

import { CmsService } from '../facade/cms.service';
import { RoutingService } from '@spartacus/core';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartEditService {
  private _cmsTicketId = '';

  constructor(
    private cmsService: CmsService,
    private routingService: RoutingService
  ) {
    this.init();
  }

  get cmsTicketId(): string {
    return this._cmsTicketId;
  }

  private init() {
    this.getCmsTicket();
    this.addPageContract();
  }

  private getCmsTicket() {
    combineLatest(
      this.cmsService.getCurrentPage(),
      this.routingService.getRouterState()
    ).subscribe(([cmsPage, routerState]) => {
      if (cmsPage === undefined && routerState.state) {
        this._cmsTicketId = routerState.state.queryParams['cmsTicketId'];
        console.log(this._cmsTicketId);
      }
    });

  private addPageContract() {
    this.cmsService.getCurrentPage().subscribe(cmsPage => {
      if (cmsPage) {
        const previousContract = [];
        Array.from(document.body.classList).forEach(attr =>
          previousContract.push(attr)
        );
        previousContract.forEach(attr => document.body.classList.remove(attr));
        // now, we hard-coded catalog verion uuid.
        document.body.classList.add(`smartedit-page-uid-${cmsPage.pageId}`);
        //document.body.classList.add(`smartedit-page-uuid-${cmsPage.uuid}`);
        document.body.classList.add(
          'smartedit-catalog-version-uuid-electronicsContentCatalog/Online'
        );
      }
    });
  }
}
