import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { CurrentUnitService } from '../current-unit.service';
import { OrgUnitService } from '../../../core/services/org-unit.service';

@Component({
  selector: 'cx-unit-details',
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentUnitService],
})
export class UnitDetailsComponent {
  orgUnit$ = this.currentUnitService.unit$;

  constructor(
    protected orgUnitsService: OrgUnitService,
    protected modalService: ModalService,
    protected currentUnitService: CurrentUnitService
  ) {}

  update(orgUnit: B2BUnit) {
    this.orgUnitsService.update(orgUnit.uid, orgUnit);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
