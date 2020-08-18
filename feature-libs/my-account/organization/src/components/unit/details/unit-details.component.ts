import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { B2BUnit, OrgUnitService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CurrentUnitService } from '../current-unit.service';

@Component({
  selector: 'cx-unit-details',
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsComponent {
  b2bUnit$: Observable<B2BUnit> = this.currentUnitService.model$;

  constructor(
    protected currentUnitService: CurrentUnitService,
    protected orgUnitsService: OrgUnitService,
    protected modalService: ModalService
  ) {}

  update(b2bUnit: B2BUnit) {
    this.orgUnitsService.update(b2bUnit.uid, b2bUnit);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
