import { Injectable } from '@angular/core';
import { Permission, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { B2BUserService, Budget } from '../../../core/index';
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

  protected update(code, value: Budget) {
    this.userService.update(code, value);
  }

  protected create(value: Budget) {
    this.userService.create(value);
  }

  protected getDetailsRoute(): string {
    return 'userDetails';
  }
}
