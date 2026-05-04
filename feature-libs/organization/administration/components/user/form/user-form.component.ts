/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  B2BUser,
  B2BUserRight,
  B2BUserRole,
  FeatureDirective,
  Title,
  TranslatePipe,
} from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUserService,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import {
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
} from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';
import { FormComponent } from '../../shared/form/form.component';
import { ItemService } from '../../shared/item.service';
import { CurrentUserService } from '../services/current-user.service';
import { UserItemService } from '../services/user-item.service';

@Component({
  selector: 'cx-org-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: UserItemService,
    },
    {
      provide: CurrentItemService,
      useExisting: CurrentUserService,
    },
  ],
  imports: [
    FormComponent,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredLegendComponent,
    NgSelectComponent,
    FormErrorsComponent,
    FormRequiredAsterisksComponent,
    NgFor,
    AsyncPipe,
    TranslatePipe,
    FeatureDirective,
  ],
})
export class UserFormComponent implements OnInit {
  form: UntypedFormGroup | null = this.itemService.getForm();

  /**
   * Initialize the business unit for the user.
   *
   * If there's a unit provided, we disable the unit form control.
   */
  @Input() set unitKey(value: string | null) {
    if (value) {
      this.form?.get('orgUnit.uid')?.setValue(value);
      this.form?.get('orgUnit')?.disable();
    }
  }

  units$: Observable<B2BUnitNode[] | undefined> = this.unitService
    .getActiveUnitList()
    .pipe(
      tap((units) => {
        if (units && units.length === 1) {
          this.form?.get('orgUnit.uid')?.setValue(units[0]?.id);
        }
      })
    );

  titles$: Observable<Title[]> = this.userProfileFacade.getTitles();

  availableRoles: B2BUserRole[] = this.b2bUserService.getAllRoles();
  availableRights: B2BUserRight[] = this.b2bUserService.getAllRights();

  constructor(
    protected itemService: ItemService<B2BUser>,
    protected unitService: OrgUnitService,
    protected userProfileFacade: UserProfileFacade,
    protected b2bUserService: B2BUserService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }

  updateRoles(event: MouseEvent) {
    const { checked, value } = event.target as HTMLInputElement;
    if (checked) {
      this.roles.push(new UntypedFormControl(value));
    } else {
      this.roles.removeAt(this.roles.value.indexOf(value));
    }
  }

  get roles(): UntypedFormArray {
    return this.form?.get('roles') as UntypedFormArray;
  }

  get isAssignedToApprovers(): UntypedFormControl {
    return this.form?.get('isAssignedToApprovers') as UntypedFormControl;
  }
}
