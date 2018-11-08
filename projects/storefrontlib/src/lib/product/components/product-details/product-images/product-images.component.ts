import { Component, Input, OnChanges } from '@angular/core';

const WAITING_CLASS = 'waiting';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnChanges {
  @Input()
  product: any;
  mainImage;

  waiting: HTMLElement;

  ngOnChanges() {
    if (this.product && this.product.images) {
      this.mainImage = this.product.images.PRIMARY;
    }
  }

  showImage(event: MouseEvent, imageContainer) {
    this.start(<HTMLElement>event.target);
    this.mainImage = imageContainer;
  }

  isMainImage(image) {
    return image.zoom.url === this.mainImage.zoom.url;
  }

  loadHandler() {
    this.clearWaitList();
  }

  private start(el: HTMLElement) {
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
