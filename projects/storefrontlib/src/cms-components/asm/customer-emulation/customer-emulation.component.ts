import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AuthService,
  RoutingService,
  User,
  UserService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  private subscription = new Subscription();

  constructor(
    protected authService: AuthService,
    protected userService: UserService,
    protected routingService: RoutingService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.userService.get().subscribe(user => (this.customer = user))
    );
  }

  endSession() {
    this.authService.logout();
    this.routingService.go({ cxRoute: 'home' });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
