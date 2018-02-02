import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';

@Component({
  selector: 'y-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductImagesComponent extends AbstractProductComponent {
  mainImage;

  ready() {
    if (this.model$ && this.model$.images) {
      this.mainImage = this.model$.images.PRIMARY;
    }
  }

  showImage(imageContainer) {
    this.mainImage = imageContainer;
    this.cd.markForCheck();
  }
}
