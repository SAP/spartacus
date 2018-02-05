import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'y-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
