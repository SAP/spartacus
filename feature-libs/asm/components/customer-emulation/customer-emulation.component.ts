import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { OccAsmAdapter } from '@spartacus/asm/occ';
import { User, UserService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ActiveCartFacade } from 'feature-libs/cart/base/root';
import { Observable, Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
  providers: [OccAsmAdapter],
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  cartId: FormControl = new FormControl();
  iconTypes = ICON_TYPE;
  isCustomerEmulationSessionInProgress$: Observable<boolean>;
  cartIdExists: boolean;
  showAssignCartSuccess = false;
  showAssignCartError = false;
  protected subscription = new Subscription();

  @Output()
  submitEvent = new EventEmitter<{ customerId?: string }>();

  constructor(
    protected asmComponentService: AsmComponentService,
    protected userService: UserService,
    protected occAsmAdapter: OccAsmAdapter,
    protected activeCartService: ActiveCartFacade
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.userService.get().subscribe((user) => {
        if (user) this.customer = user;
      })
    );
    this.isCustomerEmulationSessionInProgress$ =
      this.asmComponentService.isCustomerEmulationSessionInProgress();

    this.cartId.valueChanges.subscribe((response: string) => {
      this.cartIdExists = response.trim().length > 0;
    });

    this.activeCartService.getActive().subscribe((response) => {
      if (response?.code) {
        this.cartId.setValue(response.code);
      }
    });
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
      this.occAsmAdapter.bindCart(cartId, customerId).subscribe(
        () => {
          this.showAssignCartSuccess = true;

          setTimeout(() => {
            this.showAssignCartSuccess = false;
            this.submitEvent.emit({ customerId: customerId });
          }, 3000);
        },
        () => {
          this.showAssignCartError = true;

          setTimeout(() => {
            this.showAssignCartError = false;
          }, 3000);
        }
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
