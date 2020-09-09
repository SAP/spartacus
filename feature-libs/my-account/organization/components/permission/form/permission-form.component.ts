import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  B2BUnitNode,
  Currency,
  CurrencyService,
  OrderApprovalPermissionType,
  Period,
  Permission,
} from '@spartacus/core';
import {
  OrgUnitService,
  PermissionService,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { PermissionItemService } from '../services/permission-item.service';

@Component({
  templateUrl: './permission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: PermissionItemService,
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
