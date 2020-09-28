import { Injectable } from '@angular/core';
import { B2BUser, RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  Budget,
  Permission,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UserFormService } from '../form/user-form.service';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class UserItemService extends OrganizationItemService<Permission> {
  constructor(
    protected currentItemService: CurrentUserService,
    protected routingService: RoutingService,
    protected formService: UserFormService,
    protected userService: B2BUserService
  ) {
    super(currentItemService, routingService, formService);
  }

  load(code: string): Observable<Budget> {
    this.userService.load(code);
    return this.userService.get(code);
  }

  update(code, value: B2BUser) {
    delete value.approvers;
    this.userService.update(code, value);
  }

  protected create(value: Budget) {
    this.userService.create(value);
  }

  protected getDetailsRoute(): string {
    return 'userDetails';
  }
}
