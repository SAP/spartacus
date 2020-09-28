import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BAddress, B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitAddressItemService } from '../services/unit-address-item.service';

@Component({
  templateUrl: './unit-address-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UnitAddressItemService,
    },
  ],
})
export class UnitAddressDetailsComponent {
  unit$: Observable<B2BUnit> = this.currentUnitService.item$;

  model$: Observable<B2BAddress> = this.unit$.pipe(
    switchMap((unit) =>
      this.itemService.key$.pipe(
        switchMap((code) => this.itemService.load(unit.uid, code)),
        shareReplay({ bufferSize: 1, refCount: true })
      )
    )
  );

  constructor(
    protected itemService: OrganizationItemService<B2BAddress>,
    protected currentUnitService: CurrentUnitService
  ) {}

  deleteAddress(unitUid: string, addressId: string) {
    // TODO: redirect & notify
    ((this.itemService as any) as UnitAddressItemService).deleteAddress(
      unitUid,
      addressId
    );
  }
}
