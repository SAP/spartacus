import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';

@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  isCustomerEmulationSessionInProgress$: Observable<boolean>;
  protected subscription = new Subscription();

  constructor(
    protected asmComponentService: AsmComponentService,
    protected userService: UserService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.userService.get().subscribe((user) => {
        if (user) this.customer = user;
      })
    );
    this.isCustomerEmulationSessionInProgress$ =
      this.asmComponentService.isCustomerEmulationSessionInProgress();
  }

  logoutCustomer() {
    this.asmComponentService.logoutCustomer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
