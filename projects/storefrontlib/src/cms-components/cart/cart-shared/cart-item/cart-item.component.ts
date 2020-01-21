import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FeatureConfigService } from '@spartacus/core';
import { PromotionResult, PromotionLocation } from '@spartacus/core';
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
  @Input()
  compact = false;
  @Input()
  item: Item;

  @Input()
  isReadOnly = false;
  @Input()
  cartIsLoading = false;

  @Input()
  options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };
  @Input()
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  @Input()
  potentialProductPromotions: any[];

  @Output()
  remove = new EventEmitter<any>();
  @Output()
  update = new EventEmitter<any>();
  @Output()
  view = new EventEmitter<any>();

  @Input()
  parent: FormGroup;

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

  updateItem(updatedQuantity: number) {
    this.update.emit({ item: this.item, updatedQuantity });
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  viewItem() {
    this.view.emit();
  }
}
