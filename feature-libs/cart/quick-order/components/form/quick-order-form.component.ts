import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  Product,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { QuickOrderService } from '../../core/services/quick-order.service';

@Component({
  selector: 'cx-quick-order-form',
  templateUrl: './quick-order-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  iconTypes = ICON_TYPE;

  protected subscription = new Subscription();

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected quickOrderService: QuickOrderService
  ) {}

  ngOnInit(): void {
    this.build();
    this.subscription.add(this.watchProductAdd());
  }

  search(event?: Event): void {
    if (this.form.invalid) {
      return;
    }

    event?.preventDefault();

    const productCode = this.form.get('product')?.value;

    this.quickOrderService.search(productCode).subscribe(
      (product: Product) => {
        this.quickOrderService.addProduct(product);
      },
      (error: HttpErrorResponse) => {
        this.globalMessageService.add(
          error.error.errors[0].message,
          GlobalMessageType.MSG_TYPE_ERROR
        );
      }
    );
  }

  clear(event?: Event): void {
    event?.preventDefault();
    this.form.reset();
  }

  protected build() {
    const form = new FormGroup({});
    form.setControl('product', new FormControl(null));

    this.form = form;
  }

  protected watchProductAdd(): Subscription {
    return this.quickOrderService.productAdded$.subscribe(() => this.clear());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
