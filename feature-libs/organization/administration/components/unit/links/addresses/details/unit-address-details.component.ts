/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Address,
  B2BUnit,
  Country,
  TranslatePipe,
  UrlPipe,
  UserAddressService,
} from '@spartacus/core';
import { FocusDirective } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CardComponent } from '../../../../shared/card/card.component';
import { DeleteItemComponent } from '../../../../shared/detail/delete-item-action/delete-item.component';
import { ItemService } from '../../../../shared/item.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitAddressItemService } from '../services/unit-address-item.service';

@Component({
  selector: 'cx-org-unit-address-details',
  templateUrl: './unit-address-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: UnitAddressItemService,
    },
  ],
  imports: [
    NgIf,
    CardComponent,
    FocusDirective,
    RouterLink,
    DeleteItemComponent,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class UnitAddressDetailsComponent {
  unit$: Observable<B2BUnit | undefined> = this.currentUnitService.item$;

  model$: Observable<Address> = this.itemService.key$.pipe(
    withLatestFrom(this.unit$),
    switchMap(([code, unit]) => this.itemService.load(unit?.uid, code)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getCountry(isoCode: string | undefined): Observable<Country | undefined> {
    return this.userAddressService.getDeliveryCountries().pipe(
      tap((countries: Country[]) => {
        if (Object.keys(countries).length === 0) {
          this.userAddressService.loadDeliveryCountries();
        }
      }),
      map((countries) =>
        countries.find((country) => country.isocode === isoCode)
      )
    );
  }

  constructor(
    protected itemService: ItemService<Address>,
    protected currentUnitService: CurrentUnitService,
    protected userAddressService: UserAddressService
  ) {}
}
