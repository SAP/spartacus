import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'y-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
}
