import { Injectable } from '@angular/core';
import { B2BUser, RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { UserFormService } from '../form/user-form.service';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class UserItemService extends ItemService<B2BUser> {
  constructor(
    protected currentItemService: CurrentUserService,
    protected routingService: RoutingService,
    protected formService: UserFormService,
    protected userService: B2BUserService
  ) {
    super(currentItemService, routingService, formService);
  }

  load(code: string): Observable<B2BUser> {
    this.userService.load(code);
    return this.userService.get(code);
  }

  update(code, value: B2BUser): Observable<OrganizationItemStatus<B2BUser>> {
    delete value.approvers;
    this.userService.update(code, value);
    return this.userService.getLoadingStatus(code);
  }

  protected create(
    value: B2BUser
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userService.create(value);
    return this.userService.getLoadingStatus(null);
  }

  protected getDetailsRoute(): string {
    return 'orgUserDetails';
  }

  // @override to avoid errors while creation
  launchDetails(item: B2BUser): void {
    if (item.customerId !== null) {
      super.launchDetails(item);
    }
  }
}
