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
import { Product } from '@spartacus/core';
import { OrderGridEntry } from 'feature-libs/product/multi-d/core/model/order-grid-entry.model';
import { GridVariantOption } from 'feature-libs/product/multi-d/core/services/variants-multi-dimensional.service';
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

  constructor() {}

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
  }

  private setStockInfo(product: Product): void {
    this.hasStock = !!(
      product.stock && product.stock.stockLevelStatus !== 'outOfStock'
    );

    if (this.hasStock && product.stock?.stockLevel) {
      this.maxQuantity = product.stock.stockLevel;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
