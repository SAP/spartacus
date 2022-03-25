import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Config, OccConfig, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderGridEntry } from '../../core/model/order-grid-entry.model';
import {
  GridVariantOption,
  VariantsMultiDimensionalService,
} from '../../core/services/variants-multi-dimensional.service';

@Component({
  selector: 'cx-order-grid',
  templateUrl: './order-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderGridComponent {
  product$ = this.multiDimensionalService.product$;
  isCartStable$ = this.multiDimensionalService.isCartStable();

  private entries: OrderGridEntry[] = [];

  constructor(
    protected config: Config,
    protected multiDimensionalService: VariantsMultiDimensionalService,
    protected cd: ChangeDetectorRef
  ) {}

  getVariantOptions(): Observable<GridVariantOption[]> {
    return this.multiDimensionalService.getVariantOptions();
  }

  getVariantCategories(): string[] {
    return this.multiDimensionalService.getVariantCategories();
  }

  getAllEnriesQuantity(): number {
    return this.entries.reduce((prev, current) => {
      return prev + current.quantity;
    }, 0);
  }

  getVariantOptionImages(variant: GridVariantOption, product?: Product) {
    const images = {};
    const defaultImageObject = {
      altText: product?.name || '',
    };

    (variant.images || []).forEach((element: any) => {
      const imageObject = Object.assign(defaultImageObject, {
        format: element.image?.format,
        url: this.getBaseUrl() + element.image?.url,
      });
      Object.assign(images, imageObject);
    });

    return images;
  }

  updateEntries(entry: OrderGridEntry): void {
    const entryIndex = this.entries.findIndex(
      (element: OrderGridEntry) => element.product.code === entry.product.code
    );

    if (entryIndex === -1) {
      const element: OrderGridEntry = {
        quantity: entry.quantity,
        product: entry.product,
      };

      this.entries.push(element);
    } else {
      this.entries[entryIndex].quantity = entry.quantity;
    }
  }

  addAllToCart(): void {
    this.multiDimensionalService.addToCart(this.entries);
    this.clearEntries();
  }

  clearEntries(): void {
    this.entries = [];
    this.multiDimensionalService.entriesCleared$.next();
  }

  protected getBaseUrl(): string {
    return (
      (this.config as OccConfig).backend?.media?.baseUrl ??
      (this.config as OccConfig).backend?.occ?.baseUrl ??
      ''
    );
  }
}
