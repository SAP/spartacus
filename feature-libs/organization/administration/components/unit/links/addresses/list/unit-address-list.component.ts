import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../../../../constants';
import { ListService } from '../../../../shared/list/list.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitAddressListService } from './unit-address-list.service';

@Component({
  selector: 'cx-org-unit-address-list',
  templateUrl: './unit-address-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UnitAddressListService,
    },
  ],
})
export class UnitAddressListComponent {
  routerKey = ROUTE_PARAMS.addressCode;

  unit$: Observable<B2BUnit> = this.currentUnitService.item$;

  constructor(private currentUnitService: CurrentUnitService) {}
}
