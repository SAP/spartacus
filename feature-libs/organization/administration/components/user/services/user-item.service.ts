import { Injectable } from '@angular/core';
import { B2BUser, RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UserFormService } from '../form/user-form.service';
import { CurrentUserService } from './current-user.service';
import { MessageService } from '../../shared/organization-message/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class UserItemService extends OrganizationItemService<B2BUser> {
  constructor(
    protected currentItemService: CurrentUserService,
    protected routingService: RoutingService,
    protected formService: UserFormService,
    protected userService: B2BUserService,
    protected messageService: MessageService
  ) {
    super(currentItemService, routingService, formService, messageService);
  }

  protected i18nRoot = 'user';

  load(code: string): Observable<B2BUser> {
    this.userService.load(code);
    return this.userService.get(code);
  }

  update(code, value: B2BUser): Observable<OrganizationItemStatus<B2BUser>> {
    delete value.approvers;
    this.userService.update(code, value);
    return this.userService.getLoadingStatus(code);
  }

  protected create(value: B2BUser) {
    this.userService.create(value);
  }

  protected getDetailsRoute(): string {
    return 'userDetails';
  }

  // @override to avoid errors while creation
  launchDetails(item: B2BUser): void {
    if (item.customerId !== null) {
      super.launchDetails(item);
    }
  }
}
