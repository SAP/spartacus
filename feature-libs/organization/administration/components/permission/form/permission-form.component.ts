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
import { OrganizationItemService } from '../../shared/organization-item.service';
import { PermissionItemService } from '../services/permission-item.service';
import { ROUTE_PARAMS } from '../../constants';

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
  permissionRouteParam = ROUTE_PARAMS.permissionCode;
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
