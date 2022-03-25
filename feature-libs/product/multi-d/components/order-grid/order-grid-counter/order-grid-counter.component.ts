import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OrderGridEntry } from 'feature-libs/product/multi-d/core/model/order-grid-entry.model';
import {
  GridVariantOption,
  VariantsMultiDimensionalService,
} from 'feature-libs/product/multi-d/core/services/variants-multi-dimensional.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-order-grid-counter',
  templateUrl: './order-grid-counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderGridCounterComponent implements OnInit, OnDestroy {
  @Input() variant: GridVariantOption;

  @Output()
  quantityChange$ = new EventEmitter<OrderGridEntry>();

  maxQuantity: number = 0;
  hasStock = false;

  form = new FormGroup({
    quantity: new FormControl(0),
  });

  private subscription = new Subscription();

  constructor(
    protected multiDimensionalService: VariantsMultiDimensionalService
  ) {}

  ngOnInit() {
    if (this.variant) {
      this.setStockInfo(this.variant);
    }

    this.subscription.add(
      this.form.get('quantity')?.valueChanges.subscribe((quantity: number) => {
        this.quantityChange$.emit({
          quantity,
          product: this.variant,
        });
      })
    );

    this.watchEntriesCleared();
  }

  private setStockInfo(product: GridVariantOption): void {
    this.hasStock = !!(
      product.stock && product.stock.stockLevelStatus !== 'outOfStock'
    );

    if (this.hasStock && product.stock?.stockLevel) {
      this.maxQuantity = product.stock.stockLevel;
    }
  }

  private watchEntriesCleared(): void {
    this.subscription.add(
      this.multiDimensionalService.entriesCleared$.subscribe(() =>
        this.form.get('quantity')?.setValue(0)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
