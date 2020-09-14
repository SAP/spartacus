import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  B2BUserService,
  UserRole,
} from '@spartacus/my-account/organization/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { MessageService } from 'feature-libs/my-account/organization/components/shared';
import { OrganizationCellComponent } from '../../../../shared/organization-table/organization-cell.component';

@Component({
  templateUrl: './toggle-user-role.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleUserRoleCellComponent extends OrganizationCellComponent
  implements OnInit, OnDestroy {
  notify: boolean;
  form: FormGroup = new FormGroup({});

  availableRoles = [
    UserRole.CUSTOMER,
    UserRole.MANAGER,
    UserRole.APPROVER,
    UserRole.ADMIN,
  ];

  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected userService: B2BUserService,
    protected messageService: MessageService
  ) {
    super(outlet);
  }

  ngOnInit() {
    this.availableRoles.forEach((role) =>
      this.form.addControl(role, new FormControl(this.roles.includes(role)))
    );
  }

  get roles(): string[] {
    return this.model.roles;
  }

  save() {
    this.notify = true;
    this.form.disable();
    const roles = [...this.availableRoles].filter(
      (r) => !!this.form.get(r).value
    );
    this.userService.update(this.model.customerId, { roles });
  }

  ngOnDestroy() {
    if (this.notify) {
      this.messageService.add({
        message: {
          key: 'unitUsers.messages.rolesUpdated',
          params: {
            item: this.model,
          },
        },
        timeout: 3000,
      });
    }
  }
}
