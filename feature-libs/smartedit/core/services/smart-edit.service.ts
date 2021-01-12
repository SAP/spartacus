import { Injectable, NgZone } from '@angular/core';
import {
  BaseSite,
  BaseSiteService,
  CmsService,
  Page,
  PageType,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SmartEditService {
  private isPreviewPage = false;
  private _currentPageId: string;

  private defaultPreviewProductCode: string;
  private defaultPreviewCategoryCode: string;

  constructor(
    protected cmsService: CmsService,
    protected routingService: RoutingService,
    protected baseSiteService: BaseSiteService,
    protected zone: NgZone,
    protected winRef: WindowRef
  ) {
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

  public getDefaultPreviewCode() {
    this.baseSiteService
      .get()
      .pipe(filter(Boolean), take(1))
      .subscribe((site: BaseSite) => {
        this.defaultPreviewCategoryCode = site.defaultPreviewCategoryCode;
        this.defaultPreviewProductCode = site.defaultPreviewProductCode;

        console.log(this.defaultPreviewCategoryCode);

        this.addPageContract();
      });
  }

  protected addPageContract() {
    this.cmsService.getCurrentPage().subscribe((cmsPage) => {
      if (cmsPage) {
        this._currentPageId = cmsPage.pageId;

        // before adding contract to page, we need redirect to that page
        this.goToPreviewPage(cmsPage);

        // remove old page contract
        const previousContract = [];
        Array.from(this.winRef.document.body.classList).forEach((attr) =>
          previousContract.push(attr)
        );
        previousContract.forEach((attr) =>
          this.winRef.document.body.classList.remove(attr)
        );

        // add new page contract
        if (cmsPage.properties && cmsPage.properties.smartedit) {
          const seClasses = cmsPage.properties.smartedit.classes.split(' ');
          seClasses.forEach((classItem) => {
            this.winRef.document.body.classList.add(classItem);
          });
        }
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
}
