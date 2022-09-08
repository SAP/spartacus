import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ProductBtnActionTypes,
  ProductSelectionState,
} from '@spartacus/cart/bundle/core';
import { Product } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-bundle-product-grid-item',
  templateUrl: './bundle-product-grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleProductGridItemComponent {
  @Input() product: Product;
  @Input() selected: boolean;
  @Input() action: ProductBtnActionTypes;

  @Output() readonly selectProduct = new EventEmitter<ProductSelectionState>();
  @Output() readonly edit = new EventEmitter<string>();

  iconTypes = ICON_TYPE;
  btnActionTypes = ProductBtnActionTypes;

  toggleSelection(): void {
    this.selectProduct.next({
      isSelected: this.selected,
      product: this.product,
    });
  }

  editItem(): void {
    this.edit.next(this.product.code);
  }
}
