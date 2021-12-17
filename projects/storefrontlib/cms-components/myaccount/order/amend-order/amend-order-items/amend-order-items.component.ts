import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderEntry, Price } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../amend-order.service';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@Component({
  selector: 'cx-amend-order-items',
  templateUrl: './amend-order-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
  @Input() isConfirmation = false;

  form$: Observable<FormGroup> = this.orderAmendService.getForm();

  constructor(protected orderAmendService: OrderAmendService) {}

  getControl(form: FormGroup, entry: OrderEntry): FormControl {
    const control = <FormControl>(
      form.get('entries').get(entry.entryNumber.toString())
    );
    return control;
  }

  setAll(form: FormGroup): void {
    this.entries.forEach((entry) =>
      this.getControl(form, entry).setValue(this.getMaxAmendQuantity(entry))
    );
  }

  getItemPrice(entry: OrderEntry): Price {
    return this.orderAmendService.getAmendedPrice(entry);
  }

  getMaxAmendQuantity(entry: OrderEntry) {
    return this.orderAmendService.getMaxAmendQuantity(entry);
  }

  isCancellation() {
    return this.orderAmendService.isCancellation();
  }
}
