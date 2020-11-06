import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitItemService } from '../../../services/unit-item.service';
import { ChildUnitItemService } from './child-unit-item.service';

@Component({
  selector: 'cx-child-unit-create',
  templateUrl: './child-unit-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    // we provide a specific version of the `UnitItemService` to
    // let the form component work with child units.
    {
      provide: UnitItemService,
      useExisting: ChildUnitItemService,
    },
  ],
})
export class ChildUnitCreateComponent {
  unitKey$ = this.unitService.key$;
  constructor(protected unitService: CurrentUnitService) {}
}
