import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AsmFacade } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  OCC_CART_ID_CURRENT,
  User,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { defer, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'cx-asm-bind-cart',
  templateUrl: './asm-bind-cart.component.html',
})
export class AsmBindCartComponent implements OnInit, OnDestroy {
  @Input() customer: User;
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
        if (user) this.customer = user;
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
      this.subscription.add(
        defer(() => {
          this.loading = true;

          return this.asmFacade.bindCart({
            cartId: this.cartId.value,
            customerId,
          });
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
            () => {
              this.globalMessageService.add(
                { key: 'asm.bindCart.error' },
                GlobalMessageType.MSG_TYPE_ERROR
              );
            }
          )
      );
    }
  }

  clearText() {
    this.cartId.setValue('');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
