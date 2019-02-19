import { Component, OnInit } from '@angular/core';
import {
  Product,
  ProductService,
  RoutingService,
  WindowRef
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit {
  // productCode$: Observable<string>;
  productCode: string;
  product$: Observable<Product>;

  isWritingReview = false;
  activatedElements: HTMLElement[] = [];

  constructor(
    protected productService: ProductService,
    protected winRef: WindowRef,
    protected routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.routingService
      .getRouterState()
      .pipe(map(state => state.state.params['productCode']))
      .subscribe(productCode => {
        this.productCode = productCode;
        this.changeProduct();
      });
  }

  changeProduct(): void {
    this.product$ = this.productService.get(this.productCode);
  }

  select(event: MouseEvent, tab: HTMLElement) {
    if (this.activatedElements.indexOf(tab) === -1) {
      // remove active class on both header and content panel
      this.activatedElements.forEach(el =>
        el.classList.remove('active', 'toggled')
      );
      this.activatedElements = [<HTMLElement>event.target, tab];
      this.activatedElements.forEach(el => el.classList.add('active'));

      // only scroll if the element is not yet visible
      if (this.isElementOutViewport(tab)) {
        tab.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    } else {
      this.activatedElements.forEach(el => el.classList.toggle('toggled'));
    }
  }

  private isElementOutViewport(el) {
    if (!this.winRef.nativeWindow) {
      return false;
    }
    const rect = el.getBoundingClientRect();
    return (
      rect.bottom < 0 ||
      rect.right < 0 ||
      rect.left > this.winRef.nativeWindow.innerWidth ||
      rect.top > this.winRef.nativeWindow.innerHeight
    );
  }
}
