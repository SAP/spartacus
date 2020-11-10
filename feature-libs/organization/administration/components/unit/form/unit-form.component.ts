import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { B2BApprovalProcess, B2BUnit } from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UnitItemService } from '../services/unit-item.service';

@Component({
  selector: 'cx-unit-form',
  templateUrl: './unit-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UnitItemService,
    },
  ],
})
export class UnitFormComponent implements OnInit {
  @Input() i18nRoot = 'unit';

  @Input() createChildUnit = false;

  form$: Observable<any> = this.itemService.unit$.pipe(
    map((unit) => {
      const form = this.itemService.getForm();
      form.get('parentOrgUnit.uid')?.setValue(unit);
      if (this.createChildUnit) {
        form.get('parentOrgUnit')?.disable();
      }
      return form;
    })
  );

  units$: Observable<B2BUnitNode[]> = this.form$.pipe(
    switchMap((form) =>
      this.unitService
        .getActiveUnitList()
        .pipe(
          map((units) => units.filter((unit) => unit.id !== form?.value.uid))
        )
    )
  );

  approvalProcess$: Observable<
    B2BApprovalProcess[]
  > = this.unitService
    .getApprovalProcesses()
    .pipe(filter((items) => items?.length > 0));

  constructor(
    protected itemService: OrganizationItemService<B2BUnit>,
    protected unitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }
}
