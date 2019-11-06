import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { AsmComponentService } from '../asm-component.service';

@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  private subscription = new Subscription();

  constructor(
    protected asmComponentService: AsmComponentService,
    protected userService: UserService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.userService.get().subscribe(user => (this.customer = user))
    );
  }

  logoutCustomer() {
    this.asmComponentService.logoutCustomer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
