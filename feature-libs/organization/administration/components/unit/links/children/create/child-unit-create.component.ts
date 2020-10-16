import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitItemService } from '../../../services/unit-item.service';
import { ChildUnitItemService } from './child-unit-item.service';

@Component({
  templateUrl: './child-unit-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // we provide a specific version of the `UnitItemService` to
    // let the form component work with child units.
    {
      provide: UnitItemService,
      useExisting: ChildUnitItemService,
    },
  ],
})
export class ChildUnitCreateComponent {}
