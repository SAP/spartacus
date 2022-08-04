import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  OCC_CART_ID_CURRENT,
  User,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { HttpErrorModel } from '../../../../projects/core/src/model/misc.model';
import { AsmFacade } from '../../root';

@Component({
  selector: 'cx-asm-bind-cart',
  templateUrl: './asm-bind-cart.component.html',
})
export class AsmBindCartComponent implements OnInit, OnDestroy {
  customer: User;
  cartId: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  loading = false;

  protected subscription = new Subscription();

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected asmFacade: AsmFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected multiCartFacade: MultiCartFacade,
    protected userAccountFacade: UserAccountFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userAccountFacade.get().subscribe((user) => {
        if (user) {
          this.customer = user;
        }
      })
    );

    this.subscription.add(
      this.activeCartFacade.getActiveCartId().subscribe((response: string) => {
        if (response) {
          this.cartId.setValue(response);
        }
      })
    );
  }

  /**
   * Bind the input cart number to the customer
   */
  bindCartToCustomer() {
    const customerId = this.customer.uid;

    if (customerId && this.cartId.valid && !this.loading) {
      this.loading = true;

      const subscription = this.asmFacade
        .bindCart({
          cartId: this.cartId.value,
          customerId,
        })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          () => {
            this.globalMessageService.add(
              { key: 'asm.bindCart.success' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );

            this.multiCartFacade.loadCart({
              cartId: OCC_CART_ID_CURRENT,
              userId: customerId,
            });
          },
          (error: HttpErrorModel) => {
            this.globalMessageService.add(
              error.details?.[0].message ?? '',
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        );

      this.subscription.add(subscription);
    }
  }

  clearText() {
    this.cartId.setValue('');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
