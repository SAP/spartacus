import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Currency,
  CurrencyService,
  OrderApprovalPermissionType,
} from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
  Period,
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';
import { ItemService } from '../../shared/item.service';
import { CurrentPermissionService } from '../services/current-permission.service';
import { PermissionItemService } from '../services/permission-item.service';

@Component({
  selector: 'cx-org-permission-form',
  templateUrl: './permission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: PermissionItemService,
    },
    {
      provide: CurrentItemService,
      useExisting: CurrentPermissionService,
    },
  ],
})
export class PermissionFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList().pipe(
    tap((units) => {
      if (units.length === 1) {
        this.form?.get('orgUnit.uid')?.setValue(units[0]?.id);
      }
    })
  );

  currencies$: Observable<Currency[]> = this.currencyService.getAll().pipe(
    tap((currency) => {
      if (currency.length === 1) {
        this.form?.get('currency.isocode')?.setValue(currency[0]?.isocode);
      }
    })
  );

  types$: Observable<OrderApprovalPermissionType[]> =
    this.permissionService.getTypes();

  periods = Object.keys(Period);

  constructor(
    protected itemService: ItemService<Permission>,
    protected unitService: OrgUnitService,
    protected currencyService: CurrencyService,
    protected permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }
}
