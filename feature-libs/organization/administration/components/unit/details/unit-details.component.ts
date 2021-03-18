import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { ItemService } from '../../shared/item.service';
import { UnitItemService } from '../services/unit-item.service';
import { DetailsComponent } from '../../shared/detail/detail.component';

@Component({
  selector: 'cx-org-unit-details',
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: UnitItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class UnitDetailsComponent extends DetailsComponent<B2BUnit> {}
