/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  B2BUnit,
  FeatureConfigService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { FocusDirective } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CardComponent } from '../../shared/card/card.component';
import { DisableInfoComponent } from '../../shared/detail/disable-info/disable-info.component';
import { ToggleStatusComponent } from '../../shared/detail/toggle-status-action/toggle-status.component';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { ItemService } from '../../shared/item.service';
import { UnitItemService } from '../services/unit-item.service';

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
  imports: [
    NgIf,
    CardComponent,
    FocusDirective,
    RouterLink,
    ToggleStatusComponent,
    DisableInfoComponent,
    ItemExistsDirective,
    RouterLinkActive,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class UnitDetailsComponent {
  private featureConfigService = inject(FeatureConfigService);

  get isA11yCardNotificationMessageFeatureEnabled(): boolean {
    return this.featureConfigService.isEnabled('a11yCardNotificationMessage');
  }

  model$: Observable<B2BUnit> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );

  refreshFocusReference$ = this.model$.pipe(
    map((model) => model?.uid || model)
  );

  isInEditMode$ = this.itemService.isInEditMode$;

  readonly isUpdatingUnitAllowed = this.orgUnitService
    ? this.orgUnitService.isUpdatingUnitAllowed()
    : true;

  constructor(
    protected itemService: ItemService<B2BUnit>,
    protected orgUnitService?: OrgUnitService
  ) {}
}
