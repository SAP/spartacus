/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitItemService } from '../../../services/unit-item.service';
import { UnitChildItemService } from './unit-child-item.service';

@Component({
  selector: 'cx-org-unit-child-create',
  templateUrl: './unit-child-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    // we provide a specific version of the `UnitItemService` to
    // let the form component work with child units.
    {
      provide: UnitItemService,
      useExisting: UnitChildItemService,
    },
  ],
  standalone: false,
})
export class UnitChildCreateComponent {
  protected unitService = inject(CurrentUnitService);

  unitKey$: Observable<string> = this.unitService.key$;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {}
}
