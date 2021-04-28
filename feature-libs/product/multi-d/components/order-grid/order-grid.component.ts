import { Component, ChangeDetectionStrategy } from '@angular/core';
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

  getAllEnriesQuantity(): number {
    return this.entries.reduce((prev, current) => {
      return prev + current.quantity;
    }, 0);
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
    // TODO
    this.clearEntries();
  }

  clearEntries(): void {
    this.entries = [];
  }
}
