import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CostCenter } from '@spartacus/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { CostCenterItemService } from '../services/cost-center-item.service';

@Component({
  selector: 'cx-cost-center-details',
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: CostCenterItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class CostCenterDetailsComponent {
  model$: Observable<CostCenter> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );

  constructor(protected itemService: OrganizationItemService<CostCenter>) {}
}
