import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product, WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../../../ui/pages/product-page/current-product.service';

@Component({
  selector: 'cx-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit {
  product$: Observable<Product>;

  isWritingReview = false;
  activatedElements: HTMLElement[] = [];

  @ViewChild('descriptionHeader')
  set initial(ref: ElementRef) {
    if (ref) {
      ref.nativeElement.click();
    }
  }

  @ViewChild('reviewHeader') reviewHeader: ElementRef;

  constructor(
    protected winRef: WindowRef,
    protected currentPageService: CurrentProductService
  ) {}

  ngOnInit(): void {
    this.product$ = this.currentPageService.getProduct();
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

  openReview() {
    if (this.reviewHeader.nativeElement) {
      this.reviewHeader.nativeElement.click();
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
