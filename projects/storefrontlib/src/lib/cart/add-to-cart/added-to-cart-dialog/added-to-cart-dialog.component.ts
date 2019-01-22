import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '@spartacus/core';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.scss']
})
export class AddedToCartDialogComponent
  implements OnInit, AfterViewChecked, OnDestroy {
  entry$: Observable<any>;
  cart$: Observable<any>;
  loaded$: Observable<boolean>;

  quantity = 0;
  previousLoaded: boolean;
  finishedLoading: boolean;

  subscriptions = new Subscription();

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  form: FormGroup = this.fb.group({});

  cartLoaded$;

  constructor(
    public activeModal: NgbActiveModal,
    protected cartService: CartService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cartLoaded$ = this.cartService.getLoaded();
    this.subscriptions.add(
      this.loaded$.subscribe(res => {
        if (this.previousLoaded !== res) {
          this.finishedLoading = this.previousLoaded === false;
          this.previousLoaded = res;
        }
      })
    );
    this.subscriptions.add(
      this.entry$.subscribe(entry => {
        if (entry) {
          const { code } = entry.product;
          if (!this.form.controls[code]) {
            this.form.setControl(code, this.createEntryFormGroup(entry));
          } else {
            const entryForm = this.form.controls[code] as FormGroup;
            entryForm.controls.quantity.setValue(entry.quantity);
          }
          this.form.markAsPristine();
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

  removeEntry(item) {
    this.cartService.removeEntry(item);
    delete this.form.controls[item.product.code];
    this.activeModal.dismiss('Removed');
  }

  updateEntry({ item, updatedQuantity }) {
    this.cartService.updateEntry(item.entryNumber, updatedQuantity);
  }

  private createEntryFormGroup(entry) {
    return this.fb.group({
      entryNumber: entry.entryNumber,
      quantity: entry.quantity
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
