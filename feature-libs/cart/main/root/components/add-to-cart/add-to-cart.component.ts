import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CmsAddToCartComponent,
  EventService,
  FacadeFactoryService,
  isNotNullable,
  Product,
  UnifiedInjector,
} from '@spartacus/core';
import {
  CmsComponentData,
  CurrentProductService,
  ProductListItemContext,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { CartUiEventAddToCart } from '../../events/cart.events';
import { ActiveCartFacade } from '../../facade/active-cart.facade';

@Component({
  selector: 'cx-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() productCode: string;
  @Input() showQuantity = true;

  /**
   * As long as we do not support #5026, we require product input, as we need
   *  a reference to the product model to fetch the stock data.
   */
  @Input() product: Product;

  maxQuantity: number;

  hasStock: boolean = false;
  inventoryThreshold: boolean = false;

  showInventory$: Observable<boolean | undefined> | undefined =
    this.component?.data$.pipe(map((data) => data.inventoryDisplay));

  quantity = 1;

  subscription: Subscription;

  addToCartForm = new FormGroup({
    quantity: new FormControl(1, { updateOn: 'blur' }),
  });

  constructor(
    protected currentProductService: CurrentProductService,
    protected cd: ChangeDetectorRef,
    protected activeCartService: ActiveCartFacade,
    protected component: CmsComponentData<CmsAddToCartComponent>,
    protected eventService: EventService,
    protected injector: UnifiedInjector,
    protected facadeFactoryService: FacadeFactoryService,
    @Optional() protected productListItemContext?: ProductListItemContext
  ) {}

  ngOnInit() {
    if (this.product) {
      this.productCode = this.product.code ?? '';
      this.setStockInfo(this.product);
      this.cd.markForCheck();
    } else if (this.productCode) {
      // force hasStock and quantity for the time being, as we do not have more info:
      this.quantity = 1;
      this.hasStock = true;
      this.cd.markForCheck();
    } else {
      this.subscription = (
        this.productListItemContext
          ? this.productListItemContext.product$
          : this.currentProductService.getProduct()
      )
        .pipe(filter(isNotNullable))
        .subscribe((product) => {
          this.productCode = product.code ?? '';
          this.setStockInfo(product);
          this.cd.markForCheck();
        });
    }
  }

  protected setStockInfo(product: Product): void {
    this.quantity = 1;
    this.hasStock = Boolean(product.stock?.stockLevelStatus !== 'outOfStock');

    this.inventoryThreshold = product.stock?.isValueRounded ?? false;

    if (this.hasStock && product.stock?.stockLevel) {
      this.maxQuantity = product.stock.stockLevel;
    }

    if (this.productListItemContext) {
      this.showQuantity = false;
    }
  }

  /**
   * In specific scenarios, we need to omit displaying the stock level or append a plus to the value.
   * When backoffice forces a product to be in stock, omit showing the stock level.
   * When product stock level is limited by a threshold value, append '+' at the end.
   * When out of stock, display no numerical value.
   */
  getInventory(): string {
    if (this.hasStock) {
      const quantityDisplay = this.maxQuantity
        ? this.maxQuantity.toString()
        : '';
      return this.inventoryThreshold ? quantityDisplay + '+' : quantityDisplay;
    } else {
      return '';
    }
  }

  updateCount(value: number): void {
    this.quantity = value;
  }

  addToCart() {
    const quantity = this.addToCartForm.get('quantity')?.value;
    if (!this.productCode || quantity <= 0) {
      return;
    }
    this.activeCartService.addEntry(this.productCode, quantity);

    this.isActiveCartFacadeImplProvided()
      .pipe(first((isProvided) => isProvided))
      .subscribe((_) => {
        const newEvent = new CartUiEventAddToCart();
        newEvent.productCode = this.productCode;
        newEvent.quantity = quantity;
        this.eventService.dispatch(newEvent);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected isActiveCartFacadeImplProvided(): Observable<boolean> {
    return this.injector.get(ActiveCartFacade).pipe(
      map(
        (activeCartFacade) =>
          activeCartFacade !== undefined &&
          !this.facadeFactoryService.isProxyFacadeInstance(activeCartFacade)
      ),
      distinctUntilChanged()
    );
  }
}
