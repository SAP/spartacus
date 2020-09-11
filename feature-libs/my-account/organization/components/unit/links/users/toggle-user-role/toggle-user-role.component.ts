import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { B2BUserService } from '@spartacus/my-account/organization/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { MessageService } from 'feature-libs/my-account/organization/components/shared';
import { UserRole } from 'feature-libs/my-account/organization/core/model/user.model';
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
    UserRole.APPROVER,
    UserRole.MANAGER,
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
    // this.subscription.add(this.form.valueChanges.subscribe(() => this.save()));
  }

  get roles(): string[] {
    return this.model.roles;
  }

  save(el: HTMLInputElement, role) {
    console.log(el.checked, role);
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
          raw: 'done!',
        },
        timeout: 3000,
      });
    }
  }
}
