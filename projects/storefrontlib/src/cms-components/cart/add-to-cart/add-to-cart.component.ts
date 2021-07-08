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
  isNotNullable,
  Product,
  CmsAddToCartComponent,
} from '@spartacus/core';

import { Subscription, Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { ModalRef } from '../../../shared/components/modal/modal-ref';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { CurrentProductService } from '../../product/current-product.service';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

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

  hasStock: boolean | undefined = false;

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

  // TODO(#issueNumber-Create the issue number now): Remove deprecated constructors
  constructor(
    modalService: ModalService,
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef,
    activeCartService: ActiveCartService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    component?: CmsComponentData<CmsAddToCartComponent>
  );

  /**
   * @deprecated since 4.1
   */
  constructor(
    modalService: ModalService,
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef,
    activeCartService: ActiveCartService
  );

  constructor(
    protected modalService: ModalService,
    protected currentProductService: CurrentProductService,
    protected cd: ChangeDetectorRef,
    protected activeCartService: ActiveCartService,
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
    this.hasStock = Boolean(
      product.stock && product.stock?.stockLevelStatus !== 'outOfStock'
    );

    if (this.hasStock && product.stock?.stockLevel) {
      this.maxQuantity = product.stock.stockLevel;
    } else if (!this.hasStock) {
      this.maxQuantity = 0;
    }
  }

  getInventory(): string {
    //When backoffice forces 'In Stock' status, DO NOT display stock level info.
    if (this.hasStock) {
      //Don't show stock level if product forced to be in stock.
      return this.maxQuantity !== undefined ? this.maxQuantity + '' : '';
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
        this.openModal();
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
