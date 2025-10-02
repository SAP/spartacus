/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Address, B2BUnit, Country, UserAddressService } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ItemService } from '../../../../shared/item.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitAddressItemService } from '../services/unit-address-item.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { CardComponent } from '../../../../shared/card/card.component';
import { FocusDirective } from '../../../../../../../../projects/storefrontlib/layout/a11y/keyboard-focus/focus.directive';
import { RouterLink } from '@angular/router';
import { DeleteItemComponent } from '../../../../shared/detail/delete-item-action/delete-item.component';
import { UrlPipe } from '../../../../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { TranslatePipe } from '../../../../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

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
    MockTranslatePipe,
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
