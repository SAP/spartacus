import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  CurrentProductService,
  ProductImagesComponent,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-image-zoom-product-images.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageZoomProductImagesComponent extends ProductImagesComponent {
  expandImage = new BehaviorSubject(false);
  selectedIndex: number | undefined;
  productName: string | undefined;

  constructor(protected currentProductService: CurrentProductService) {
    super(currentProductService);
  }

  getProductName(): string | undefined {
    this.currentProductService
      .getProduct()
      .subscribe((product) => {
        this.productName = product?.name;
      })
      .unsubscribe();
    return this.productName;
  }

  openImage(item: any): void {
    this.mainMediaContainer.next(item);
    this.selectedIndex = this.mainMediaContainer.value?.zoom?.galleryIndex;
  }

  /**
   * Opens image zoom dialog.
   */
  triggerZoom(value: boolean): void {
    this.expandImage.next(value);
  }
}
