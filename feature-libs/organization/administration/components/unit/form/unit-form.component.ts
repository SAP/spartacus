/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { B2BApprovalProcess, B2BUnit, isNotUndefined } from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';
import { ItemService } from '../../shared/item.service';
import { createCodeForEntityName } from '../../shared/utility/entity-code';
import { CurrentUnitService } from '../services/current-unit.service';
import { UnitItemService } from '../services/unit-item.service';

@Component({
  selector: 'cx-org-unit-form',
  templateUrl: './unit-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: UnitItemService,
    },
    {
      provide: CurrentItemService,
      useExisting: CurrentUnitService,
    },
  ],
})
export class UnitFormComponent implements OnInit {
  @Input() i18nRoot = 'orgUnit';

  @Input() createChildUnit = false;

  form: UntypedFormGroup | null = this.itemService.getForm();

  units$: Observable<B2BUnitNode[] | undefined> = this.itemService.unit$.pipe(
    tap((unit) => {
      this.form?.get('parentOrgUnit.uid')?.setValue(unit);
      if (this.createChildUnit) {
        this.form?.get('parentOrgUnit')?.disable();
      }
    }),
    switchMap(() =>
      this.unitService.getActiveUnitList().pipe(
        map((units) =>
          units?.filter((unit) => unit.id !== this.form?.value.uid)
        ),
        tap((units) => {
          if (units && units.length === 1) {
            this.form?.get('parentOrgUnit.uid')?.setValue(units[0]?.id);
          }
        })
      )
    )
  );

  approvalProcess$: Observable<B2BApprovalProcess[]> = this.unitService
    .getApprovalProcesses()
    .pipe(
      filter(isNotUndefined),
      filter((items) => items.length > 0)
    );

  constructor(
    protected itemService: ItemService<B2BUnit>,
    protected unitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }

  createUidWithName(
    name: AbstractControl | null,
    code: AbstractControl | null
  ): void {
    createCodeForEntityName(name, code);
  }
}
