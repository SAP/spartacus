/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  B2BUnitNode,
  OrgUnitService,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { createCodeForEntityName } from '../../shared/utility/entity-code';
import { UserGroupItemService } from '../services/user-group-item.service';
import { FormComponent } from '../../shared/form/form.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { FormRequiredLegendComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-required-legend/form-required-legend.component';
import { FormRequiredAsterisksComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { FormErrorsComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-user-group-form',
  templateUrl: './user-group-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: UserGroupItemService,
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
export class UserGroupFormComponent implements OnInit {
  form: UntypedFormGroup | null = this.itemService.getForm();

  // getList ???
  units$: Observable<B2BUnitNode[] | undefined> = this.unitService
    .getActiveUnitList()
    .pipe(
      tap((units) => {
        if (units && units.length === 1) {
          this.form?.get('orgUnit.uid')?.setValue(units[0]?.id);
        }
      })
    );

  constructor(
    protected itemService: ItemService<UserGroup>,
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
