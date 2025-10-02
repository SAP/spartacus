/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { FormComponent } from '../../shared/form/form.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { FormRequiredLegendComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-required-legend/form-required-legend.component';
import { FormRequiredAsterisksComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { FormErrorsComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

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
  imports: [
    FormComponent,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredLegendComponent,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    NgSelectComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class PermissionFormComponent implements OnInit {
  form: UntypedFormGroup | null = this.itemService.getForm();

  units$: Observable<B2BUnitNode[] | undefined> = this.unitService
    .getActiveUnitList()
    .pipe(
      tap((units) => {
        if (units && units.length === 1) {
          this.form?.get('orgUnit.uid')?.setValue(units[0].id);
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

  types$: Observable<OrderApprovalPermissionType[] | undefined> =
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
