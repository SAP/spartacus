import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CostCenter } from '@spartacus/core';
import { ItemService } from '../../shared/item.service';
import { CostCenterItemService } from '../services/cost-center-item.service';
import { DetailsComponent } from '../../shared/detail/detail.component';

@Component({
  selector: 'cx-org-cost-center-details',
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: CostCenterItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class CostCenterDetailsComponent extends DetailsComponent<CostCenter> {}
