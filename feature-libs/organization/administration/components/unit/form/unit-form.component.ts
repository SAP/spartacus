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
import { Observable } from 'rxjs';
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

  form: FormGroup = this.itemService.getForm();
  approvalProcess$: Observable<
    B2BApprovalProcess[]
  > = this.unitService.getApprovalProcesses().pipe(
    filter((items) => items?.length > 0),
    tap((process) => {
      if (process.length === 1)
        this.form.get('approvalProcess.code')?.setValue(process[0]?.code);
    })
  );

  form$: Observable<any> = this.itemService.unit$.pipe(
    map((unit) => {
      this.form.get('parentOrgUnit.uid')?.setValue(unit);
      if (this.createChildUnit) {
        this.form.get('parentOrgUnit')?.disable();
      }
      return this.form;
    })
  );

  units$: Observable<B2BUnitNode[]> = this.form$.pipe(
    switchMap((form) =>
      this.unitService.getActiveUnitList().pipe(
        map((units) => units.filter((unit) => unit.id !== form?.value.uid)),
        tap((unit) => {
          if (unit.length === 1)
            this.form?.get('parentOrgUnit.uid').setValue(unit[0].id);
        })
      )
    )
  );

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
