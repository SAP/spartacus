/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  B2BApprovalProcess,
  B2BUnit,
  isNotUndefined,
  TranslatePipe,
} from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import {
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  NgSelectA11yDirective,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';
import { FormComponent } from '../../shared/form/form.component';
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
  imports: [
    FormComponent,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredLegendComponent,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    NgSelectComponent,
    NgSelectA11yDirective,
    AsyncPipe,
    TranslatePipe,
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
