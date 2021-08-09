import { Injectable, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import {
  BaseSiteService,
  CmsService,
  Page,
  PageType,
  RoutingService,
  ScriptLoader,
  WindowRef,
} from '@spartacus/core';
import { SmartEditConfig } from '@spartacus/smartedit/root';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SmartEditService {
  private isPreviewPage = false;
  private _currentPageId: string | undefined;

  private defaultPreviewProductCode: string | undefined;
  private defaultPreviewCategoryCode: string | undefined;

  constructor(
    protected cmsService: CmsService,
    protected routingService: RoutingService,
    protected baseSiteService: BaseSiteService,
    protected zone: NgZone,
    protected winRef: WindowRef,
    protected rendererFactory: RendererFactory2,
    protected config: SmartEditConfig,
    protected scriptLoader: ScriptLoader
  ) {
    // load webApplicationInjector.js first
    this.loadScript();

    if (winRef.nativeWindow) {
      const window = winRef.nativeWindow as any;
      // rerender components and slots after editing
      window.smartedit = window.smartedit || {};
      window.smartedit.renderComponent = (
        componentId: string,
        componentType: string,
        parentId: string
      ) => {
        return this.renderComponent(componentId, componentType, parentId);
      };

      // reprocess page
      window.smartedit.reprocessPage = this.reprocessPage;
    }
  }

  public processCmsPage(): void {
    this.baseSiteService
      .get()
      .pipe(
        filter((site: any) => Boolean(site)),
        take(1)
      )
      .subscribe((site) => {
        this.defaultPreviewCategoryCode = site.defaultPreviewCategoryCode;
        this.defaultPreviewProductCode = site.defaultPreviewProductCode;

        this.cmsService
          .getCurrentPage()
          .pipe(filter<Page>(Boolean))
          .subscribe((cmsPage) => {
            this._currentPageId = cmsPage.pageId;
            // before adding contract to page, we need redirect to that page
            this.goToPreviewPage(cmsPage);
            this.addPageContract(cmsPage);
          });
      });
  }

  /**
   * load webApplicationInjector.js
   */
  protected loadScript(): void {
    this.scriptLoader.embedScript({
      src: 'assets/webApplicationInjector.js',
      params: undefined,
      attributes: {
        id: 'text/smartedit-injector',
        'data-smartedit-allow-origin': this.config.smartEdit?.allowOrigin,
      },
    });
  }

  /**
   * add CSS classes in a body tag
   */
  protected addPageContract(cmsPage: Page) {
    const renderer = this.rendererFactory.createRenderer('body', null);
    const element = this.winRef.document.body;

    // remove old page contract
    const previousContract: string[] = [];
    Array.from(element.classList).forEach((attr) =>
      previousContract.push(attr)
    );
    previousContract.forEach((attr) => renderer.removeClass(element, attr));

    // add new page contract
    this.addSmartEditContract(element, renderer, cmsPage.properties);
  }

  /**
   * go to the default preview page
   */
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

  /**
   * re-render CMS components and slots
   */
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
   * add smartedit HTML markup contract
   */
  public addSmartEditContract(
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
            classes.forEach((classItem: string) => {
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
