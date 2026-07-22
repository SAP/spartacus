/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserIdService } from '@spartacus/core';
import { IconComponent, ICON_TYPE } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { SetDefaultOrgUnit } from '../../core/store/actions/b2b-unit-selection.actions';
import { B2bUnitSelectorStateService } from '../../core/services/b2b-unit-selector-state.service';

@Component({
  selector: 'cx-b2b-unit-selector',
  templateUrl: './b2b-unit-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, IconComponent, TranslatePipe],
})
export class B2bUnitSelectorComponent {
  iconTypes = ICON_TYPE;

  private stateService = inject(B2bUnitSelectorStateService);
  private store = inject(Store);
  private userIdService = inject(UserIdService);

  orgUnits$ = this.stateService.orgUnits$;
  activeUnitName$ = this.stateService.activeUnitName$;

  onChange(name: string): void {
    this.userIdService
      .takeUserId(true)
      .pipe(take(1))
      .subscribe((userId) => {
        this.store.dispatch(new SetDefaultOrgUnit({ userId, unitUid: name }));
      });
  }
}
