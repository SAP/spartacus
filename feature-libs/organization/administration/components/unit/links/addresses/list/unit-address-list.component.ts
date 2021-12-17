import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { ListService } from '../../../../shared/list/list.service';
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
}
