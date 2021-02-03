import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BApprovalProcess, B2BUnit } from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';
import { ItemService } from '../../shared/item.service';
import { CurrentUnitService } from '../services/current-unit.service';
import { UnitItemService } from '../services/unit-item.service';
import { AbstractControl } from '@angular/forms';
import { createCodeForEntityName } from '../../shared/utility/entity-code';

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

  /*
   * TODO: 4.0: rename to `form` #10710
   */
  formGroup: FormGroup = this.itemService.getForm();

  /*
   * deprecated since 3.0, use `formGroup` instead
   */
  form$: Observable<FormGroup> = of(this.formGroup);

  units$: Observable<B2BUnitNode[]> = this.itemService.unit$.pipe(
    tap((unit) => {
      this.formGroup.get('parentOrgUnit.uid')?.setValue(unit);
      if (this.createChildUnit) {
        this.formGroup.get('parentOrgUnit')?.disable();
      }
    }),
    switchMap(() =>
      this.unitService.getActiveUnitList().pipe(
        map((units) =>
          units.filter((unit) => unit.id !== this.formGroup?.value.uid)
        ),
        tap((units) => {
          if (units.length === 1) {
            this.formGroup?.get('parentOrgUnit.uid')?.setValue(units[0]?.id);
          }
        })
      )
    )
  );

  approvalProcess$: Observable<
    B2BApprovalProcess[]
  > = this.unitService
    .getApprovalProcesses()
    .pipe(filter((items) => items?.length > 0));

  constructor(
    protected itemService: ItemService<B2BUnit>,
    protected unitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }

  createUidWithName(name: AbstractControl, code: AbstractControl): void {
    createCodeForEntityName(name, code);
  }
}
