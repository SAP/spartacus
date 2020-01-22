import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  FeatureConfigService,
  PromotionLocation,
  PromotionResult,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';

export interface Item {
  product?: any;
  quantity?: any;
  basePrice?: any;
  totalPrice?: any;
  updateable?: boolean;
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
  @Input() potentialProductPromotions: any[];
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

  constructor(
    promotionService: PromotionService,
    // tslint:disable-next-line:unified-signatures
    featureConfig: FeatureConfigService
  );
  /**
   * @deprecated Since 1.5
   * Add featureConfig for save for later.
   * Remove issue: #5958
   */
  constructor(promotionService: PromotionService);

  constructor(
    protected promotionService: PromotionService,
    private featureConfig?: FeatureConfigService
  ) {}

  ngOnInit() {
    this.appliedProductPromotions$ = this.promotionService.getProductPromotionForEntry(
      this.item,
      this.promotionLocation
    );
  }

  //TODO remove feature flag for #5958
  isSaveForLaterEnabled(): boolean {
    if (this.featureConfig) {
      return this.featureConfig.isEnabled('saveForLater');
    }
    return false;
  }
  //TODO remove feature flag for #5958

  isProductOutOfStock(product: any) {
    // TODO Move stocklevelstatuses across the app to an enum
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  removeItem() {
    this.quantityControl.setValue(0);
    this.quantityControl.markAsDirty();
  }

  viewItem() {
    this.view.emit();
  }
}
