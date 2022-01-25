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
  ActiveCartService,
  CmsAddToCartComponent,
  isNotNullable,
  Product,
} from '@spartacus/core';
import { AddedToCartToastConfig } from 'feature-libs/cart/added-to-cart-toast/added-to-cart-toast-config';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { ModalRef } from '../../../shared/components/modal/modal-ref';
import { ModalService } from '../../../shared/components/modal/modal.service';
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

  /**
   * As long as we do not support #5026, we require product input, as we need
   *  a reference to the product model to fetch the stock data.
   */
  @Input() product: Product;

  maxQuantity: number;
  modalRef: ModalRef;

  hasStock: boolean = false;
  inventoryThreshold: boolean = false;

  showInventory$:
    | Observable<boolean | undefined>
    | undefined = this.component?.data$.pipe(
    map((data) => data.inventoryDisplay)
  );

  quantity = 1;
  protected numberOfEntriesBeforeAdd = 0;

  subscription: Subscription;

  addToCartForm = new FormGroup({
    quantity: new FormControl(1, { updateOn: 'blur' }),
  });

  constructor(
    protected modalService: ModalService,
    protected currentProductService: CurrentProductService,
    protected cd: ChangeDetectorRef,
    protected activeCartService: ActiveCartService,
    @Optional() protected addedToCartToastConfig?: AddedToCartToastConfig,
    @Optional() protected component?: CmsComponentData<CmsAddToCartComponent>
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
      this.subscription = this.currentProductService
        .getProduct()
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
    const quantity = this.addToCartForm.get('quantity').value;
    if (!this.productCode || quantity <= 0) {
      return;
    }
    this.activeCartService
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        this.numberOfEntriesBeforeAdd = entries.length;
        if (
          this.addedToCartToastConfig &&
          !this.addedToCartToastConfig.addedToCartToast?.enabled
        ) {
          this.openModal();
        }
        this.activeCartService.addEntry(this.productCode, quantity);
      });
  }

  /**
   * Provides required data and opens AddedToCartDialogComponent modal
   */
  protected openModal() {
    let modalInstance: any;
    this.modalRef = this.modalService.open(AddedToCartDialogComponent, {
      centered: true,
      size: 'lg',
    });

    modalInstance = this.modalRef.componentInstance;
    // Display last entry for new product code. This always corresponds to
    // our new item, independently of whether merging occured or not
    modalInstance.entry$ = this.activeCartService.getLastEntry(
      this.productCode
    );
    modalInstance.cart$ = this.activeCartService.getActive();
    modalInstance.loaded$ = this.activeCartService.isStable();
    modalInstance.quantity = this.quantity;
    modalInstance.numberOfEntriesBeforeAdd = this.numberOfEntriesBeforeAdd;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
