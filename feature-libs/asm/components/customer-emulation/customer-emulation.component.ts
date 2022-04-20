import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OccAsmAdapter } from '@spartacus/asm/occ';
import { User, UserService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
  styleUrls: ['./customer-emulation.component.scss'],
  providers: [OccAsmAdapter],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  cartId: FormControl = new FormControl();
  isCustomerEmulationSessionInProgress$: Observable<boolean>;
  cartIdExists: boolean;
  protected subscription = new Subscription();

  constructor(
    protected asmComponentService: AsmComponentService,
    protected userService: UserService,
    protected occAsmAdapter: OccAsmAdapter
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

    //https://localhost:9002/assistedservicewebservices/customers/search?baseSite=electronics-spa&sort=byNameAsc&query=cman&pageSize=20

    console.log('customerId', customerId);
    console.log('cartId', cartId);

    if (customerId) {
      this.occAsmAdapter.bindCart(cartId, customerId).subscribe();
    }
  }

  cancel() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
