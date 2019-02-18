import { Component, Input, OnChanges } from '@angular/core';
import { ProductDetailOutlets } from '../../../product-outlets.model';

const WAITING_CLASS = 'waiting';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnChanges {
  outlets = ProductDetailOutlets;

  @Input() product: any;

  mainImageContainer;

  waiting: HTMLElement;

  ngOnChanges() {
    if (this.product && this.product.images) {
      this.mainImageContainer = this.product.images.PRIMARY;
    }
  }

  showImage(event: MouseEvent, imageContainer) {
    if (this.mainImageContainer === imageContainer) {
      return;
    }
    this.startWaiting(<HTMLElement>event.target);
    this.mainImageContainer = imageContainer;
  }

  isMainImageContainer(imageContainer) {
    return imageContainer.zoom.url === this.mainImageContainer.zoom.url;
  }

  loadHandler() {
    this.clearWaitList();
  }

  private startWaiting(el: HTMLElement) {
    this.clearWaitList();
    el.classList.add(WAITING_CLASS);
    this.waiting = el;
  }

  private clearWaitList() {
    if (this.waiting) {
      this.waiting.classList.remove(WAITING_CLASS);
      delete this.waiting;
    }
  }
}
