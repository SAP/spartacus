import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FeatureConfigService,
  AuthService,
  RoutingService,
  AuthRedirectService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

export interface Item {
  product?: any;
  quantity?: any;
  basePrice?: any;
  totalPrice?: any;
  updateable?: boolean;
}

@Component({
  selector: 'cx-cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input()
  compact = false;
  @Input()
  item: Item;
  @Input()
  potentialProductPromotions: any[];
  @Input()
  isReadOnly = false;
  @Input()
  cartIsLoading = false;
  @Input()
  optionalButton = undefined;
  @Input()
  showTotal = true;

  @Output()
  remove = new EventEmitter<any>();
  @Output()
  update = new EventEmitter<any>();
  @Output()
  view = new EventEmitter<any>();
  @Output()
  optionalAction = new EventEmitter<any>();

  @Input()
  parent: FormGroup;

  private subscription: Subscription;

  ngOnInit() {}

  constructor(
    private featureConfig: FeatureConfigService,
    private authService: AuthService,
    private routingService: RoutingService,
    private authRedirectService: AuthRedirectService
  ) {}

  isSelectiveCartEnabled() {
    return this.featureConfig.isEnabled('selectiveCart');
  }

  doOtionalAction() {
    this.subscription = this.authService.isUserLoggedIn().subscribe(loggedIn => {
      if (loggedIn) {
        this.optionalAction.emit(this.item);
      } else {
        this.routingService.go({ cxRoute: 'login' });
        this.authRedirectService.reportAuthGuard();
      }
    });
  }

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

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
