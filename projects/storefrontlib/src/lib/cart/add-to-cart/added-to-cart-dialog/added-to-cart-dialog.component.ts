import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '@spartacus/core';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.scss']
})
export class AddedToCartDialogComponent implements OnInit, AfterViewChecked {
  entry$: Observable<any>;
  cart$: Observable<any>;
  loaded$: Observable<boolean>;
  quantity = 0;
  previousLoadedState;
  finishedLoading;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  form: FormGroup = this.fb.group({});

  constructor(
    public activeModal: NgbActiveModal,
    protected cartService: CartService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loaded$.subscribe(res => {
      if (this.previousLoadedState !== res) {
        this.finishedLoading = this.previousLoadedState === false;
        this.previousLoadedState = res;
      }
    });
    this.entry$.subscribe(entry => {
      const { code } = entry.product;
      if (!this.form.controls[code]) {
        this.form.setControl(code, this.createEntryFormGroup(entry));
      } else {
        const entryForm = this.form.controls[code] as FormGroup;
        entryForm.controls.quantity.setValue(entry.quantity);
      }
    });
  }

  ngAfterViewChecked() {
    if (this.finishedLoading) {
      this.finishedLoading = false;
      const elementToFocus = this.dialog.nativeElement.querySelector(
        `[ngbAutofocus]`
      ) as HTMLElement;
      elementToFocus.focus();
    }
  }

  private createEntryFormGroup(entry) {
    return this.fb.group({
      entryNumber: entry.entryNumber,
      quantity: entry.quantity
    });
  }
}
