import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartService, Cart, OrderEntry } from '@spartacus/core';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.scss'],
})
export class AddedToCartDialogComponent implements OnInit, AfterViewChecked {
  entry$: Observable<OrderEntry>;
  cart$: Observable<Cart>;
  loaded$: Observable<boolean>;
  cartLoaded$: Observable<boolean>;

  quantity = 0;
  headerLabel = `addToCart.itemsAddedToYourCart`;
  previousLoaded: boolean;
  finishedLoading: boolean;
  private firstUpdate = true;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  form: FormGroup = this.fb.group({});

  constructor(
    public activeModal: NgbActiveModal,
    protected cartService: CartService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loaded$ = this.loaded$.pipe(
      tap(res => {
        if (this.previousLoaded !== res) {
          this.finishedLoading = this.previousLoaded === false;
          this.previousLoaded = res;
        }
      })
    );

    this.entry$ = this.entry$.pipe(
      tap(entry => {
        if (entry) {
          const { code } = entry.product;
          if (!this.form.controls[code]) {
            this.form.setControl(code, this.createEntryFormGroup(entry));
          } else {
            const entryForm = this.form.controls[code] as FormGroup;
            entryForm.controls.quantity.setValue(entry.quantity);
          }
          this.form.markAsPristine();

          // Announce in header if Add To Cart button has incremented product
          if (this.firstUpdate && entry.quantity > 1) {
            this.headerLabel = `addToCart.itemsIncrementedInYourCart`;
          } else {
            this.headerLabel = `addToCart.itemsAddedToYourCart`;
          }

          // Any updates after the first will be flagged as false
          this.firstUpdate = false;
        }
      })
    );
  }

  ngAfterViewChecked() {
    if (this.finishedLoading) {
      this.finishedLoading = false;
      const elementToFocus = this.dialog.nativeElement.querySelector(
        `[ngbAutofocus]`
      ) as HTMLElement;
      if (elementToFocus) {
        elementToFocus.focus();
      }
    }
  }

  removeEntry(item): void {
    this.cartService.removeEntry(item);
    delete this.form.controls[item.product.code];
    this.activeModal.dismiss('Removed');
  }

  updateEntry({ item, updatedQuantity }): void {
    this.cartService.updateEntry(item.entryNumber, updatedQuantity);
  }

  private createEntryFormGroup(entry): FormGroup {
    return this.fb.group({
      entryNumber: entry.entryNumber,
      quantity: entry.quantity,
    });
  }
}
