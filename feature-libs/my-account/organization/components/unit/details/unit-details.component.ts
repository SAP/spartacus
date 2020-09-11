import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { ModalService } from '@spartacus/storefront';
import { CurrentUnitService } from '../current-unit.service';

@Component({
  selector: 'cx-unit-details',
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsComponent {
  orgUnit$ = this.currentUnitService.item$;

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
