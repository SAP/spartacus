import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  RoutingService,
  User,
  UserService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
})
export class CustomerEmulationComponent implements OnInit {
  customer$: Observable<User>;

  constructor(
    protected userService: UserService,
    protected authService: AuthService,
    protected routingService: RoutingService
  ) {}

  ngOnInit() {
    this.customer$ = this.userService.get();
  }

  endSession() {
    this.authService.logout();
    this.routingService.go({ cxRoute: 'home' });
  }
}
