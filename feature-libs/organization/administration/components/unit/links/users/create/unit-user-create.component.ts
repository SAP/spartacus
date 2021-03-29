import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserItemService } from '../../../../user/services/user-item.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitUserItemService } from './unit-user-item.service';

@Component({
  selector: 'cx-org-unit-user-create',
  templateUrl: './unit-user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    // we provide a specific version of the `UnitItemService` to
    // let the form component work with child units.
    {
      provide: UserItemService,
      useExisting: UnitUserItemService,
    },
  ],
})
export class UnitUserCreateComponent {
  unitKey$: Observable<string> = this.unitService.key$;
  constructor(protected unitService: CurrentUnitService) {}
}
