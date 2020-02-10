import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderEntry, Price } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../amend-order.service';

@Component({
  selector: 'cx-amend-order-items',
  templateUrl: './amend-order-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOrReturnItemsComponent implements OnInit {
  hasBaseOptions = false;

  @Input() entries: OrderEntry[];
  @Input() isConfirmation = false;

  form$: Observable<FormGroup> = this.orderAmendService.getForm();

  constructor(protected orderAmendService: OrderAmendService) {}

  ngOnInit() {
    this.entries.forEach(
      entry => (this.hasBaseOptions = entry.product.baseOptions.length !== 0)
    );
  }

  getControl(form: FormGroup, entry: OrderEntry): FormControl {
    return <FormControl>form.get('entries').get(entry.entryNumber.toString());
  }

  setAll(form: FormGroup): void {
    this.entries.forEach(entry =>
      this.getControl(form, entry).setValue(this.getMaxAmendQuantity(entry))
    );
  }

  getItemPrice(entry: OrderEntry): Price {
    return this.orderAmendService.getAmendedPrice(entry);
  }

  getMaxAmendQuantity(entry: OrderEntry): number {
    return this.orderAmendService.getMaxAmendQuantity(entry);
  }

  isCancellation(): boolean {
    return this.orderAmendService.isCancellation();
  }
}
