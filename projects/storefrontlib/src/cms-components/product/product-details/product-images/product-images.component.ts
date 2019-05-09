import { Component, Input, OnChanges } from '@angular/core';
import { ProductDetailOutlets } from '../../product-outlets.model';

const WAITING_CLASS = 'waiting';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
})
export class ProductImagesComponent implements OnChanges {
  outlets = ProductDetailOutlets;

  @Input() product: any;

  mainImageContainer;

  waiting: HTMLElement;

  ngOnChanges(): void {
    if (this.product && this.product.images) {
      this.mainImageContainer = this.product.images.PRIMARY;
    }
  }

  showImage(event: MouseEvent, imageContainer): void {
    if (this.mainImageContainer === imageContainer) {
      return;
    }
    this.startWaiting(<HTMLElement>event.target);
    this.mainImageContainer = imageContainer;
  }

  isMainImageContainer(imageContainer): boolean {
    return (
      this.mainImageContainer.zoom &&
      imageContainer.zoom &&
      imageContainer.zoom.url === this.mainImageContainer.zoom.url
    );
  }

  loadHandler(): void {
    this.clearWaitList();
  }

  private startWaiting(el: HTMLElement): void {
    this.clearWaitList();
    el.classList.add(WAITING_CLASS);
    this.waiting = el;
  }

  private clearWaitList(): void {
    if (this.waiting) {
      this.waiting.classList.remove(WAITING_CLASS);
      delete this.waiting;
    }
  }
}
