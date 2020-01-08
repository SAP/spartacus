import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderEntry, Price } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../order-amend.service';

@Component({
  selector: 'cx-cancel-or-return-items',
  templateUrl: './cancel-or-return-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
  @Input() isConfirmation = false;

  form: FormGroup;

  constructor(protected orderAmendService: OrderAmendService) {}

  getForm(): Observable<FormGroup> {
    return this.orderAmendService.getForm();
  }

  getControl(form: FormGroup, entry: OrderEntry): FormControl {
    return <FormControl>form.get('entries').get(entry.entryNumber.toString());
  }

  setAll(form: FormGroup): void {
    this.entries.forEach(entry =>
      this.getControl(form, entry).setValue(this.getMaxAmmendQuantity(entry))
    );
  }

  getItemPrice(entry: OrderEntry): Price {
    return this.orderAmendService.getEntryPrice(entry);
  }

  getMaxAmmendQuantity(entry: OrderEntry) {
    return this.orderAmendService.getMaxAmmendQuantity(entry);
  }

  isCancellation() {
    return this.orderAmendService.isCancellation();
  }
}
