import { LocationStrategy } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLinkWithHref,
  UrlTree,
} from '@angular/router';
import {
  CmsService,
  ImageGroup,
  PageContext,
  PageType,
  Product,
  ProductReferenceService,
  ProductReviewService,
  ProductScope,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { CxLinkBuilder } from './cx-link.builder';

@Directive({
  selector: '[cxRouterLink]',
  exportAs: 'cxRouterLink',
})
export class CxRouterLinkDirective
  extends RouterLinkWithHref
  implements OnDestroy
{
  protected fetched: Map<string, boolean> = new Map();

  @Input() cxRouterLinkData?: { type: 'product' | 'cms'; id: string };

  protected cxCommands: any[] | null = null;
  protected cxRouter: Router;
  protected cxRoute: ActivatedRoute;
  protected subscriptions = new Subscription();

  constructor(
    router: Router,
    route: ActivatedRoute,
    locationStrategy: LocationStrategy,

    protected elementRef: ElementRef<HTMLAnchorElement>,
    protected cxLinkBuilder: CxLinkBuilder,

    // products
    protected productService: ProductService,
    protected productReviewService: ProductReviewService,
    protected productReferenceService: ProductReferenceService,

    // cms
    protected routingService: RoutingService,
    protected cmsService: CmsService
  ) {
    super(router, route, locationStrategy);
    this.cxRouter = router;
    this.cxRoute = route;
  }

  // @override
  @Input()
  set cxRouterLink(commands: any[] | string | null | undefined) {
    if (commands != null) {
      this.cxCommands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.cxCommands = null;
    }
  }

  // @override
  get urlTree(): UrlTree {
    return this.cxRouter.createUrlTree(this.cxCommands ?? [], {
      relativeTo:
        this.relativeTo !== undefined ? this.relativeTo : this.cxRoute,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: attrBoolValue(this.preserveFragment),
    });
  }

  @HostListener('mouseenter') onHover(): void {
    if (this.cxRouterLinkData?.type === 'product') {
      const id = this.cxRouterLinkData.id;
      if (this.fetched.has(id)) {
        return;
      }

      this.fetched.set(id, true);
      this.preFetchProductData(id);
      this.preFetchCmsData(id);
    }
  }

  protected preFetchProductData(id: string): void {
    const scopes: ProductScope[] = [
      ProductScope.LIST,
      ProductScope.DETAILS,
      ProductScope.ATTRIBUTES,
      ProductScope.VARIANTS,
    ];
    const reviews$ = this.productReviewService.getByProductCode(id);

    const product$ = this.productService.get(id, scopes).pipe(
      filter((product) => !!product),
      take(1),
      // images
      tap((product) => this.preFetchImages(product)),
      // references
      tap(() => this.productReferenceService.loadProductReferences(id)),
      // reviews
      switchMap(() => reviews$)
    );
    this.productReferenceService.loadProductReferences(id);

    this.subscriptions.add(product$.subscribe());
  }

  protected preFetchCmsData(id: string): void {
    const predictedContext: PageContext = { id, type: PageType.PRODUCT_PAGE };

    const page$ = this.cmsService.getPage(predictedContext);
    const componentData$ =
      this.cmsService.getComponentData('TabPanelContainer');

    this.subscriptions.add(page$.subscribe());
    this.subscriptions.add(componentData$.subscribe());
  }

  protected preFetchImages(product: Product | undefined): void {
    if (!product) {
      return;
    }

    const imageGroups = ([] as ImageGroup[])
      .concat(product.images?.PRIMARY ?? [])
      .concat(product.images?.GALLERY ?? []);

    imageGroups.forEach((group) => {
      Object.keys(group).forEach((type) => {
        const href = group[type].url;
        if (href) {
          this.cxLinkBuilder.injectPreFetch({
            href,
            rel: 'prefetch',
            as: 'image',
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriptions.unsubscribe();
  }
}

function attrBoolValue(s: any): boolean {
  return s === '' || !!s;
}
