import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { Observable, Subscription } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ActivePermissionGuard } from '../guards/active-permission.guard';
import { PermissionItemService } from '../services/permission-item.service';

@Component({
  templateUrl: './permission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: PermissionItemService,
    },
    ActivePermissionGuard,
  ],
})
export class PermissionFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  permissionGuardSubscription: Subscription;

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
    protected permissionService: PermissionService,
    protected activePermissionGuard: ActivePermissionGuard
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }

  ngAfterViewInit(): void {
    this.permissionGuardSubscription = this.activePermissionGuard
      .canActivate()
      .subscribe();
  }

  ngOnDestroy(): void {
    this.permissionGuardSubscription.unsubscribe();
  }
}
