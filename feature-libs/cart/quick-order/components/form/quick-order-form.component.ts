import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICON_TYPE } from '@spartacus/storefront';
import { QuickOrderService } from '../../core/services/quick-order.service';

@Component({
  selector: 'cx-quick-order-form',
  templateUrl: './quick-order-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderFormComponent implements OnInit {
  form: FormGroup;
  iconTypes = ICON_TYPE;

  constructor(protected quickOrderService: QuickOrderService) {}

  ngOnInit(): void {
    this.build();
  }

  search(event: Event): void {
    if (this.form.invalid) {
      return;
    }

    event.preventDefault();

    const productCode = this.form.get('product')?.value;
    this.quickOrderService.search(productCode);
  }

  clear(event: Event): void {
    event.preventDefault();
    this.form.reset();
  }

  protected build() {
    const form = new FormGroup({});
    form.setControl('product', new FormControl(null));

    this.form = form;
  }
}
