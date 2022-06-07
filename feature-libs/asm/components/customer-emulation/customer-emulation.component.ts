import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AsmFacadeService } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  OCC_CART_ID_CURRENT,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  cartId: FormControl = new FormControl();
  isCustomerEmulationSessionInProgress$: Observable<boolean>;
  cartIdExists: boolean;
  protected subscription = new Subscription();

  @Output()
  submitEvent = new EventEmitter<{ customerId?: string }>();

  constructor(
    protected asmComponentService: AsmComponentService,
    protected userService: UserService,
    protected activeCartFacade: ActiveCartFacade,
    protected globalMessageService: GlobalMessageService,
    protected asmFacadeService: AsmFacadeService,
    protected multiCartFacade: MultiCartFacade
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.userService.get().subscribe((user) => {
        if (user) this.customer = user;
      })
    );
    this.isCustomerEmulationSessionInProgress$ =
      this.asmComponentService.isCustomerEmulationSessionInProgress();

    this.subscription.add(
      this.cartId.valueChanges.subscribe((response: string) => {
        this.cartIdExists = response.trim().length > 0;
      })
    );

    this.subscription.add(
      this.activeCartFacade.getActiveCartId().subscribe((response) => {
        if (response) {
          this.cartId.setValue(response);
        }
      })
    );
  }

  logoutCustomer() {
    this.asmComponentService.logoutCustomer();
  }

  /**
   * Assign the input cart number to the customer
   */
  assignCartToCustomer() {
    const customerId = this.customer.uid;
    const cartId = this.cartId.value;

    if (customerId) {
      this.subscription.add(
        this.asmFacadeService.bindCart({ cartId, customerId }).subscribe(
          () => {
            this.globalMessageService.add(
              { key: 'asm.assignCart.success' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );

            this.multiCartFacade.loadCart({
              cartId: OCC_CART_ID_CURRENT,
              userId: customerId,
            });
          },
          () => {
            this.globalMessageService.add(
              { key: 'asm.assignCart.error' },
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
