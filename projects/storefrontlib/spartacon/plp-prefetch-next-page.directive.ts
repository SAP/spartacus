import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgZone,
} from '@angular/core';
import { ProductSearchConnector } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { ProductListComponentService } from '../cms-components/product/product-list/container/product-list-component.service';

// @NgModule({
//   declarations: [PlpPrefetchNextPageDirective],
//   exports: [PlpPrefetchNextPageDirective],
// })
// export class PlpPrefetchNextPageModule {}

@Directive({ selector: '[cxPlpPrefetchNextPage]' })
export class PlpPrefetchNextPageDirective {
  constructor(
    protected elementRef: ElementRef,
    protected ngZone: NgZone,
    protected plpComponentService: ProductListComponentService,
    protected productSearchConnector: ProductSearchConnector
  ) {}

  protected observer: IntersectionObserver;

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    this.observer?.unobserve(this.elementRef.nativeElement);
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    if (this.prefetchStrategy === 'inViewport') {
      this.initIntersectionObserver();
    }
  }

  protected initIntersectionObserver() {
    const callback = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.ngZone.run(() => this.preload());
        }
      });
    };

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(callback, {
        root: null,
        rootMargin: '500px',
        threshold: 0,
      });
    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  searchCriteria$ = this.plpComponentService.searchCriteria$;

  private preloadedSearchCriteria = new Map<string, boolean>();

  // TODO: make it driven by intersection observer

  /**
   * Strategy, when to preload
   */
  @Input('cxPlpPrefetchNextPage')
  prefetchStrategy: 'onHover' | 'inViewport' = 'onHover';

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.prefetchStrategy === 'onHover') {
      this.preload();
    }
  }

  preload() {
    console.log('⏰ start preloading the next page data!');

    this.plpComponentService.searchCriteria$
      .pipe(take(1))
      .subscribe((criteria) => {
        const key = JSON.stringify(criteria);
        if (this.preloadedSearchCriteria.has(key)) {
          return;
        }
        this.preloadedSearchCriteria.set(key, true);

        // SPIKE - SORT CODE SHOULD ALSO BE RETRIEVED
        const { pageSize, currentPage } = criteria;

        this.productSearchConnector
          .search(criteria.query || '', {
            // CAUTION! query params order is important for caching keys!
            // TO BE VERIFIED!
            currentPage: Number(currentPage || 0) + 1, // caution, currentPage is a string
            pageSize,
          })
          .subscribe(() => {
            console.log('😌 next page data preloaded!');
          }); // SPIKE TODO IMPROVE
      });
  }
}
