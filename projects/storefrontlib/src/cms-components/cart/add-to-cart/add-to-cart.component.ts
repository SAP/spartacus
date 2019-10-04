import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CartService, OrderEntry, Product } from '@spartacus/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
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
  @Input() purchasable: boolean;
  @Input() showQuantity = true;

  maxQuantity: number;
  modalRef: ModalRef;

  hasStock = false;
  quantity = 1;
  increment = false;

  cartEntry$: Observable<OrderEntry>;
  subscription: Subscription = new Subscription();

  constructor(
    protected cartService: CartService,
    protected modalService: ModalService,
    protected currentProductService: CurrentProductService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.productCode) {
      this.cartEntry$ = this.cartService.getEntry(this.productCode);
      this.hasStock = true;
    } else {
      this.subscription = this.currentProductService
        .getProduct()
        .pipe(filter(Boolean))
        .subscribe((product: Product) => {
          this.productCode = product.code;
          this.purchasable = product.purchasable;
          this.quantity = 1;

          if (
            product.stock &&
            product.stock.stockLevelStatus !== 'outOfStock' &&
            product.stock.stockLevel > 0
          ) {
            this.maxQuantity = product.stock.stockLevel;
            this.hasStock = true;
          } else {
            this.hasStock = false;
          }

          this.cartEntry$ = this.cartService.getEntry(this.productCode);

          this.cd.markForCheck();
        });
    }

    // (GH-4363) This prevents the add-to-cart modal opening when an error is present
    this.subscription.add(
      combineLatest([
        this.cartService.getLoaded(),
        this.cartService.getCartError(),
      ]).subscribe(([loaded, error]) => {
        if (error && loaded) {
          this.modalRef.close();
        }
      })
    );
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
        this.cartService.addEntry(this.productCode, this.quantity);
        this.openModal();
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

  disableButton(): boolean {
    return (
      this.quantity < 0 || this.quantity > this.maxQuantity || !this.purchasable
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
