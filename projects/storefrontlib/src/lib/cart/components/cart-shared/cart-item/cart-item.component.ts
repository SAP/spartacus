import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'y-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() entries: any[];
  @Input() disableProductLink = false;
  @Input() isReadOnly = false;
  @Input() potentialProductPromotions: any[];

  private currentWindowWidth: number;
  form: FormGroup = this.fb.group({});

  timeout: any;

  @Output() remove = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  constructor(protected fb: FormBuilder) {}

  @HostListener('window:resize')
  onResize() {
      this.currentWindowWidth = window.innerWidth;
  }

  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;
    this.entries.forEach(entry => {
      const entryProductCode = entry.product.code;
      if (!this.form.controls[entryProductCode]) {
        this.form.setControl(
          entry.product.code,
          this.createEntryFormGroup(entry)
        );
      } else {
        // update form on entries update
        const entryForm = this.form.controls[entryProductCode] as FormGroup;
        entryForm.controls.quantity.setValue(entry.quantity);
      }
    });
  }

  removeEntry(entry) {
    this.remove.emit(entry);
    delete this.form.controls[entry.product.code];
  }

  updateEntry(updatedQuantity: number, entry) {
    this.update.emit({ entry, updatedQuantity });
  }

  get isMobile() {
    return this.currentWindowWidth < 768;
  }

  getPromotionForEntry(entry: any): any {
    const entryPromotions = [];
    if (this.potentialProductPromotions && this.potentialProductPromotions.length > 0) {
      for (const promotion of this.potentialProductPromotions) {
        if (
          promotion.description &&
          promotion.consumedEntries &&
          promotion.consumedEntries.length > 0
        ) {
          for (const consumedEntry of promotion.consumedEntries) {
            if (this.isConsumedByEntry(consumedEntry, entry)) {
              entryPromotions.push(promotion);
            }
          }
        }
      }
    }
    return entryPromotions;
  }

  private isConsumedByEntry(consumedEntry: any, entry: any): boolean {
    const consumendEntryNumber = consumedEntry.orderEntryNumber;
    if (entry.entries && entry.entries.length > 0) {
      for (const subEntry of entry.entries) {
        if (subEntry.entryNumber === consumendEntryNumber) {
          return true;
        }
      }
      return false;
    } else {
      return consumendEntryNumber === entry.entryNumber;
    }
  }

  private createEntryFormGroup(entry) {
    return this.fb.group({
      entryNumber: entry.entryNumber,
      quantity: entry.quantity
    });
  }
}
