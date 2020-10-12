import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUser, B2BUserGroup } from '@spartacus/core';
import { B2BUserService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { MessageService } from '../../../../shared/organization-message/services/message.service';
import { UnitUserItemService } from '../services/unit-user-item.service';
import { UnitUserRolesFormService } from './unit-user-roles-form.service';

@Component({
  templateUrl: './unit-user-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UnitUserItemService,
    },
  ],
})
export class UnitUserRolesFormComponent {
  protected item: B2BUser;

  @ViewChild(MessageService, { read: MessageService })
  messageService: MessageService;

  form$: Observable<FormGroup> = this.itemService.current$.pipe(
    tap((item) => {
      if (!this.item) {
        this.item = item;
      }
      if (this.item.roles.join() !== item.roles.join()) {
        this.notify(item);
        this.item = item;
      }
    }),
    map((item) => this.formService.getForm(item))
  );

  availableRoles: B2BUserGroup[] = this.userService.getAllRoles();

  constructor(
    protected itemService: OrganizationItemService<B2BUser>,
    protected formService: UnitUserRolesFormService,
    protected userService: B2BUserService
  ) {}

  save(form: FormGroup) {
    form.disable();
    const roles = [...this.availableRoles].filter((r) => !!form.get(r).value);
    this.userService.update(this.item.customerId, { roles });
  }

  protected notify(item: B2BUser) {
    this.messageService.add({
      message: {
        key: 'unitUserRoles.messages.rolesUpdated',
        params: { item: item },
      },
    });
  }
}
