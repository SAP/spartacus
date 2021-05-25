import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  PromotionLocation,
  PromotionResult,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
})
export class AddedToCartDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;

  entry$: Observable<OrderEntry>;
  cart$: Observable<Cart>;
  loaded$: Observable<boolean>;
  addedEntryWasMerged$: Observable<boolean>;
  /**
   * @deprecated since 3.0, set numberOfEntriesBeforeAdd instead
   */
  increment: boolean;
  numberOfEntriesBeforeAdd: number;
  orderPromotions$: Observable<PromotionResult[]>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  quantity = 0;
  modalIsOpen = false;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  form: FormGroup = new FormGroup({});

  protected quantityControl$: Observable<FormControl>;

  constructor(
    protected modalService: ModalService,
    protected cartService: ActiveCartService,
    protected promotionService: PromotionService
  ) {}
  /**
   * Returns an observable formControl with the quantity of the cartEntry,
   * but also updates the entry in case of a changed value.
   * The quantity can be set to zero in order to remove the entry.
   */
  getQuantityControl(): Observable<FormControl> {
    if (!this.quantityControl$) {
      this.quantityControl$ = this.entry$.pipe(
        filter((e) => !!e),
        map((entry) => this.getQuantityFormControl(entry)),
        switchMap(() =>
          this.form.valueChanges.pipe(
            // eslint-disable-next-line import/no-deprecated
            startWith(null),
            tap((valueChange) => {
              if (valueChange) {
                this.cartService.updateEntry(
                  valueChange.entryNumber,
                  valueChange.quantity
                );
                if (valueChange.quantity === 0) {
                  this.dismissModal('Removed');
                }
              } else {
                this.form.markAsPristine();
              }
            })
          )
        ),
        map(() => <FormControl>this.form.get('quantity')),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.quantityControl$;
  }

  ngOnInit() {
    this.orderPromotions$ = this.promotionService.getOrderPromotions(
      this.promotionLocation
    );
    this.addedEntryWasMerged$ = this.loaded$.pipe(
      filter((loaded) => loaded),
      switchMapTo(this.cartService.getEntries()),
      map((entries) => entries.length === this.numberOfEntriesBeforeAdd)
    );
  }

  /**
   * Adds quantity and entryNumber form controls to the FormGroup.
   * Returns quantity form control.
   */
  protected getQuantityFormControl(entry: OrderEntry): FormControl {
    if (!this.form.get('quantity')) {
      const quantity = new FormControl(entry.quantity, { updateOn: 'blur' });
      this.form.addControl('quantity', quantity);

      const entryNumber = new FormControl(entry.entryNumber);
      this.form.addControl('entryNumber', entryNumber);
    }
    return <FormControl>this.form.get('quantity');
  }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }
}
