import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Currency, CurrencyService } from '@spartacus/core';
import {
  B2BUnitNode,
  OrderApprovalPermissionType,
  OrgUnitService,
  Period,
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { CurrentPermissionService } from '../services/current-permission.service';
import { PermissionItemService } from '../services/permission-item.service';

@Component({
  templateUrl: './permission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: PermissionItemService,
    },
    {
      provide: CurrentOrganizationItemService,
      useExisting: CurrentPermissionService,
    },
  ],
})
export class PermissionFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();
  types$: Observable<
    OrderApprovalPermissionType[]
  > = this.permissionService.getTypes();
  periods = Object.keys(Period);

  constructor(
    protected itemService: OrganizationItemService<Permission>,
    protected unitService: OrgUnitService,
    protected currencyService: CurrencyService,
    protected permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }
}
