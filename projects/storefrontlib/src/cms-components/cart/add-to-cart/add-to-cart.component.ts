import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import {
  CartService,
  OrderEntry,
  Product,
  ProductService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ModalRef, ModalService } from '../../../shared/components/modal/index';
import { CurrentProductService } from '../../product/current-product.service';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';

@Component({
  selector: 'cx-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() productCode: string;
  @Input() showQuantity = true;

  maxQuantity: number;
  modalRef: ModalRef;

  hasStock = false;
  quantity = 1;
  increment = false;
  isStyleVariantSelected = false;
  isSizeVariantSelected = false;
  hasVariants = false;

  cartEntry$: Observable<OrderEntry>;

  subscription: Subscription;

  constructor(
    cartService: CartService,
    modalService: ModalService,
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef,
    // tslint:disable-next-line: unified-signatures
    productService: ProductService
  );
  /**
   * @deprecated since version 1.4
   *  Use constructor(store: Store<StateWithUser | StateWithProcess<void>>,
   *  authService: AuthService) instead
   */
  constructor(
    cartService: CartService,
    modalService: ModalService,
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef
  );
  constructor(
    protected cartService: CartService,
    protected modalService: ModalService,
    protected currentProductService: CurrentProductService,
    private cd: ChangeDetectorRef,
    @Optional() private productService?: ProductService
  ) {}

  ngOnInit() {
    if (this.productCode) {
      this.cartEntry$ = this.cartService.getEntry(this.productCode);
      this.subscription = this.productService
        .get(this.productCode)
        .pipe(filter(p => !!p))
        .subscribe((product: Product) => {
          this.setStockInfo(product);
          this.cd.markForCheck();
        });
    } else {
      this.subscription = this.currentProductService
        .getProduct()
        .pipe(filter(Boolean))
        .subscribe((product: Product) => {
          if (product.baseOptions && product.baseOptions.length) {
            this.checkForVariantTypesSelection(product);
          }

          this.productCode = product.code;
          this.hasVariants = !!(
            product.variantOptions && product.variantOptions.length
          );
          this.setStockInfo(product);
          this.cartEntry$ = this.cartService.getEntry(this.productCode);
          this.cd.markForCheck();
        });
    }
  }

  private setStockInfo(product: Product): void {
    this.quantity = 1;
    this.hasStock =
      product.stock &&
      product.stock.stockLevelStatus !== 'outOfStock' &&
      product.stock.stockLevel > 0;
    if (this.hasStock) {
      this.maxQuantity = product.stock.stockLevel;
    }
  }

  updateCount(value: number): void {
    this.quantity = value;
  }

  addToCart() {
    if (!this.productCode || this.quantity <= 0) {
      return;
    }
    // check item is already present in the cart
    // so modal will have proper header text displayed
    this.cartService
      .getEntry(this.productCode)
      .subscribe(entry => {
        if (entry) {
          this.increment = true;
        }
        this.openModal();
        this.cartService.addEntry(this.productCode, this.quantity);
        this.increment = false;
      })
      .unsubscribe();
  }

  private openModal() {
    let modalInstance: any;
    this.modalRef = this.modalService.open(AddedToCartDialogComponent, {
      centered: true,
      size: 'lg',
    });

    modalInstance = this.modalRef.componentInstance;
    modalInstance.entry$ = this.cartEntry$;
    modalInstance.cart$ = this.cartService.getActive();
    modalInstance.loaded$ = this.cartService.getLoaded();
    modalInstance.quantity = this.quantity;
    modalInstance.increment = this.increment;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resetVariantsSelections() {
    this.isStyleVariantSelected = false;
    this.isSizeVariantSelected = false;
  }

  checkForVariantTypesSelection(product: Product) {
    this.resetVariantsSelections();
    product.baseOptions.forEach(baseOption => {
      if (baseOption.variantType === 'ApparelStyleVariantProduct') {
        this.isStyleVariantSelected = true;
      }
      if (baseOption.variantType === 'ApparelSizeVariantProduct') {
        this.isSizeVariantSelected = true;
      }
    });
  }
}
