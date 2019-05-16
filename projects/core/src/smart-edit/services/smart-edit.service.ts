import { Injectable, NgZone } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { RoutingService } from '../../routing/facade/routing.service';
import { CmsService } from '../../cms/facade/cms.service';
import { Page } from '../../cms/model/page.model';
import { WindowRef } from '../../window/window-ref';
import { PageType } from '../../model/cms.model';

@Injectable({
  providedIn: 'root',
})
export class SmartEditService {
  private _cmsTicketId: string;
  private getPreviewPage = false;
  private _currentPageId: string;

  constructor(
    private cmsService: CmsService,
    private routingService: RoutingService,
    private zone: NgZone,
    winRef: WindowRef
  ) {
    this.getCmsTicket();
    this.addPageContract();

    if (winRef.nativeWindow) {
      const window = winRef.nativeWindow as any;
      // rerender components and slots after editing
      window.smartedit = window.smartedit || {};
      window.smartedit.renderComponent = (
        componentId,
        componentType,
        parentId
      ) => {
        return this.renderComponent(componentId, componentType, parentId);
      };

      // reprocess page
      window.smartedit.reprocessPage = this.reprocessPage;
    }
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
        if (routerState.nextState && !this._cmsTicketId) {
          this._cmsTicketId = routerState.nextState.queryParams['cmsTicketId'];
          if (this._cmsTicketId) {
            this.cmsService.launchInSmartEdit = true;
          }
        }
      });
  }

  protected addPageContract() {
    this.cmsService.getCurrentPage().subscribe(cmsPage => {
      if (cmsPage && this._cmsTicketId) {
        this._currentPageId = cmsPage.pageId;

        // before adding contract, we need redirect to preview page
        this.goToPreviewPage(cmsPage);

        // remove old page contract
        const previousContract = [];
        Array.from(document.body.classList).forEach(attr =>
          previousContract.push(attr)
        );
        previousContract.forEach(attr => document.body.classList.remove(attr));

        // add new page contract
        if (cmsPage.properties && cmsPage.properties.smartedit) {
          const seClasses = cmsPage.properties.smartedit.classes.split(' ');
          seClasses.forEach(classItem => {
            document.body.classList.add(classItem);
          });
        }
      }
    });
  }

  private goToPreviewPage(cmsPage: Page) {
    // the first page is the smartedit preview page
    if (!this.getPreviewPage) {
      this.getPreviewPage = true;

      if (cmsPage.type === PageType.PRODUCT_PAGE) {
        this.routingService.go({
          cxRoute: 'product',
          params: { code: 2053367 },
        });
      } else if (cmsPage.type === PageType.CATEGORY_PAGE) {
        this.routingService.go({
          cxRoute: 'category',
          params: { code: 575 },
        });
      }
    }
  }

  protected renderComponent(
    componentId: string,
    componentType?: string,
    parentId?: string
  ): boolean {
    if (componentId) {
      this.zone.run(() => {
        // without parentId, it is slot
        if (!parentId) {
          if (this._currentPageId) {
            this.cmsService.refreshPageById(this._currentPageId);
          } else {
            this.cmsService.refreshLatestPage();
          }
        } else if (componentType) {
          this.cmsService.refreshComponent(componentId);
        }
      });
    }

    return true;
  }

  protected reprocessPage() {
    // TODO: reprocess page API
  }
}
