import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'y-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {
  @Input() product: any;
  mainImage;

  ngOnInit() {
    if (this.product && this.product.images) {
      this.mainImage = this.product.images.PRIMARY;
    }
  }

  showImage(imageContainer) {
    this.mainImage = imageContainer;
  }
}
