import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnChanges {
  @Input()
  product: any;
  mainImage;

  ngOnChanges() {
    if (this.product && this.product.images) {
      this.mainImage = this.product.images.PRIMARY;
    }
  }

  showImage(imageContainer) {
    this.mainImage = imageContainer;
  }

  isMainImage(image) {
    return image.zoom.url === this.mainImage.zoom.url;
  }
}
