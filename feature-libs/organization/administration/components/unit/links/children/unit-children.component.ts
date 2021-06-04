import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ListService } from '../../../shared/list/list.service';
import { CurrentUnitService } from '../../services/current-unit.service';
import { UnitChildrenService } from './unit-children.service';

@Component({
  selector: 'cx-org-unit-children',
  templateUrl: './unit-children.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UnitChildrenService,
    },
  ],
})
export class UnitChildrenComponent {
  unit$: Observable<B2BUnit> = this.currentUnitService
    ? this.currentUnitService.item$
    : of({ active: true });

  constructor(protected currentUnitService: CurrentUnitService) {}
}
