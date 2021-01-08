import { Injectable, NgZone, Renderer2 } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter, take, takeWhile } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { Page } from '../../cms/model/page.model';
import { BaseSite } from '../../model';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { WindowRef } from '../../window/window-ref';

@Injectable({
  providedIn: 'root',
})
export class SmartEditService {
  private _cmsTicketId: string;
  private isPreviewPage = false;
  private _currentPageId: string;
  private _launchedInSmartEdit = false;

  private defaultPreviewProductCode: string;
  private defaultPreviewCategoryCode: string;

  constructor(
    protected cmsService: CmsService,
    protected routingService: RoutingService,
    protected baseSiteService: BaseSiteService,
    protected zone: NgZone,
    protected winRef: WindowRef
  ) {
    this.getCmsTicket();

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
    combineLatest([
      this.cmsService.getCurrentPage(),
      this.routingService.getRouterState(),
    ])
      .pipe(
        takeWhile(([cmsPage]) => cmsPage === undefined),
        filter(([, routerState]) => {
          if (routerState.nextState && !this._cmsTicketId) {
            this._cmsTicketId =
              routerState.nextState.queryParams['cmsTicketId'];
            if (this._cmsTicketId) {
              return true;
            }
          }
          return false;
        }),
        take(1)
      )
      .subscribe(() => {
        this._launchedInSmartEdit = true;
        this.getDefaultPreviewCode();
      });
  }

  protected getDefaultPreviewCode() {
    this.baseSiteService
      .get()
      .pipe(filter(Boolean), take(1))
      .subscribe((site: BaseSite) => {
        this.defaultPreviewCategoryCode = site.defaultPreviewCategoryCode;
        this.defaultPreviewProductCode = site.defaultPreviewProductCode;

        this.addPageContract();
      });
  }

  protected addPageContract() {
    this.cmsService.getCurrentPage().subscribe((cmsPage) => {
      if (cmsPage && this._cmsTicketId) {
        this._currentPageId = cmsPage.pageId;

        // before adding contract to page, we need redirect to that page
        this.goToPreviewPage(cmsPage);
      }
    });
  }

  protected goToPreviewPage(cmsPage: Page) {
    // only the first page is the smartedit preview page
    if (!this.isPreviewPage) {
      this.isPreviewPage = true;
      if (
        cmsPage.type === PageType.PRODUCT_PAGE &&
        this.defaultPreviewProductCode
      ) {
        this.routingService.go({
          cxRoute: 'product',
          params: { code: this.defaultPreviewProductCode, name: '' },
        });
      } else if (
        cmsPage.type === PageType.CATEGORY_PAGE &&
        this.defaultPreviewCategoryCode
      ) {
        this.routingService.go({
          cxRoute: 'category',
          params: { code: this.defaultPreviewCategoryCode },
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

  /**
   * Whether the app launched in smart edit
   */
  isLaunchedInSmartEdit(): boolean {
    return this._launchedInSmartEdit;
  }

  /**
   * Add smartedit HTML markup contract
   */
  addSmartEditContract(
    element: Element,
    renderer: Renderer2,
    properties: any
  ): void {
    if (properties) {
      // check each group of properties, e.g. smartedit
      Object.keys(properties).forEach((group) => {
        const name = 'data-' + group + '-';
        const groupProps = properties[group];

        // check each property in the group
        Object.keys(groupProps).forEach((propName) => {
          const propValue = groupProps[propName];
          if (propName === 'classes') {
            const classes = propValue.split(' ');
            classes.forEach((classItem) => {
              renderer.addClass(element, classItem);
            });
          } else {
            renderer.setAttribute(
              element,
              name +
                propName
                  .split(/(?=[A-Z])/)
                  .join('-')
                  .toLowerCase(),
              propValue
            );
          }
        });
      });
    }
  }
}
