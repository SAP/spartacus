import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PromotionLocation, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';
import { ICON_TYPE } from '../../../misc/icon/icon.model';

export interface Item {
  entryNumber?: any;
  product?: any;
  quantity?: any;
  basePrice?: any;
  totalPrice?: any;
  updateable?: boolean;
  statusSummaryList?: any[];
  configurationInfos?: any[];
}

export interface CartItemComponentOptions {
  isSaveForLater?: boolean;
  optionalBtn?: any;
}

@Component({
  selector: 'cx-cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent implements OnInit {
  @Input() compact = false;
  @Input() item: Item;
  @Input() readonly = false;
  @Input() quantityControl: FormControl;

  @Output() view = new EventEmitter<any>();

  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  // TODO: evaluate whether this is generic enough
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };

  appliedProductPromotions$: Observable<PromotionResult[]>;
  iconTypes = ICON_TYPE;

  constructor(protected promotionService: PromotionService) {}

  ngOnInit() {
    this.appliedProductPromotions$ = this.promotionService.getProductPromotionForEntry(
      this.item,
      this.promotionLocation
    );
  }

  isProductOutOfStock(product: any) {
    // TODO Move stocklevelstatuses across the app to an enum
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  hasIssues(): boolean {
    return this.getNumberOfIssues() > 0;
  }

  getNumberOfIssues(): number {
    let numberOfIssues = 0;
    if (this.item.statusSummaryList) {
      this.item.statusSummaryList.forEach((statusSummary) => {
        if (statusSummary.status === 'ERROR') {
          numberOfIssues = statusSummary.numberOfIssues;
        }
      });
    }
    return numberOfIssues;
  }

  removeItem() {
    this.quantityControl.setValue(0);
    this.quantityControl.markAsDirty();
  }

  viewItem() {
    this.view.emit();
  }

  getIssueMessageKey(numberOfErrors: number): string {
    if (numberOfErrors && numberOfErrors !== 0) {
      if (numberOfErrors === 1) {
        return 'cartItems.numberOfIssue';
      } else {
        return 'cartItems.numberOfIssues';
      }
    }
    return '';
  }
}
