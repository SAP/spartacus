import { Component } from '@angular/core';
import { B2BUser, B2BUserService, RoutingService } from '@spartacus/core';

// TODO:#my-account-architecture - add a test
@Component({
  selector: 'cx-user-create',
  templateUrl: './user-create.component.html',
})
export class B2BUserCreateComponent {
  constructor(
    protected b2bUserService: B2BUserService,
    protected routingService: RoutingService
  ) {}

  createB2BUser(b2bUser: B2BUser) {
    this.b2bUserService.create(b2bUser);
  }
}
