import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';
import * as fromCartStore from '../../store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';

@Component({
  selector: 'y-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartComponent implements OnInit {
  modalInstance: AddedToCartDialogComponent;

  isLoading = false;
  @Input() iconOnly;

  @Input() productCode;
  @Input() quantity = 1;

  cartEntry$: Observable<any>;

  constructor(
    protected cartService: CartService,
    private modalService: NgbModal,
    protected store: Store<fromStore.CartState>
  ) {}

  ngOnInit() {
    if (this.productCode) {
      this.cartEntry$ = this.store
        .select(fromStore.getEntrySelectorFactory(this.productCode))
        .pipe(
          tap(entry => {
            if (this.isLoading && entry) {
              this.openModal();
            }
            this.isLoading = false;
          })
        );
    }
  }

  addToCart() {
    if (!this.productCode || this.quantity <= 0) {
      return;
    }
    this.isLoading = true;

    this.cartService.addCartEntry(this.productCode, this.quantity);
  }

  openModal() {
    this.modalInstance = this.modalService
      .open(AddedToCartDialogComponent, { centered: true, size: 'lg' }).componentInstance;
    this.modalInstance.entry$ = this.cartEntry$;
    this.modalInstance.cart$ = this.store.select(fromCartStore.getActiveCart);
    this.modalInstance.quantity = this.quantity;

    this.modalInstance.updateEntryEvent.subscribe((data: any) =>
      this.updateEntry(data)
    );

    this.modalInstance.removeEntryEvent.subscribe((data: any) => {
      this.removeEntry(data);
    });
  }

  private updateEntry({ entry, updatedQuantity }) {
    this.cartService.updateCartEntry(entry.entryNumber, updatedQuantity);
  }
  private removeEntry(entry) {
    this.cartService.removeCartEntry(entry);
    this.modalInstance.close();
  }
}
