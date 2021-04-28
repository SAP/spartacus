import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  GridVariantOption,
  VariantsMultiDimensionalService,
} from '../../core/services/variants-multi-dimensional.service';

export interface OrderGridEntry {
  quantity?: number;
  product: Product;
}

@Component({
  selector: 'cx-order-grid',
  templateUrl: './order-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderGridComponent {
  product$ = this.multiDimensionalService.product$;

  private entries: OrderGridEntry[] = [];

  constructor(
    protected multiDimensionalService: VariantsMultiDimensionalService
  ) {}

  getVariantOptions(): Observable<GridVariantOption[]> {
    return this.multiDimensionalService.getVariantOptions();
  }

  getVariantCategories(): string[] {
    return this.multiDimensionalService.getVariantCategories();
  }

  updateEntries(entry: OrderGridEntry): void {
    const entryIndex = this.entries.findIndex(
      (element: OrderGridEntry) => element.product.code === entry.product.code
    );

    if (entryIndex === -1) {
      const element = {
        quantity: entry.quantity,
        product: {
          code: entry.product.code,
        },
      } as OrderGridEntry;

      this.entries.push(element);
    } else {
      this.entries[entryIndex].quantity = entry.quantity;
    }
  }

  addAllToCart(): void {
    // TODO
    this.clearEntries();
  }

  protected clearEntries(): void {
    this.entries = [];
  }
}
