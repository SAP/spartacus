import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUnit, B2BUnitNode } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UnitItemService } from '../services/unit-item.service';

@Component({
  templateUrl: './unit-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UnitItemService,
    },
  ],
})
export class UnitFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService
    .getActiveUnitList()
    .pipe(
      map((units) => units.filter((unit) => unit.id !== this.form?.value.uid))
    );

  approvalProcess$ = this.unitService
    .getApprovalProcesses()
    .pipe(filter((items) => items.length > 0));

  constructor(
    protected itemService: OrganizationItemService<B2BUnit>,
    protected unitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }
}
