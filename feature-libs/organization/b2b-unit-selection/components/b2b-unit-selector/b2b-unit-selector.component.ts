/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgSelectComponent } from '@ng-select/ng-select';
import { TranslatePipe } from '@spartacus/core';
import {
  IconComponent,
  ICON_TYPE,
  NgSelectA11yDirective,
} from '@spartacus/storefront';
import { AbstractB2bUnitSelectorComponent } from './abstract-b2b-unit-selector.component';

/**
 * Company (B2B Unit) selector component.
 * Registered as a CMS Flex component (flexType: B2bUnitSelectorComponent)
 * and placed in SiteContextSlot via ImpEx.
 */
@Component({
  selector: 'cx-b2b-unit-selector',
  templateUrl: './b2b-unit-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    FormsModule,
    NgSelectComponent,
    NgSelectA11yDirective,
    IconComponent,
    TranslatePipe,
  ],
})
export class B2bUnitSelectorComponent extends AbstractB2bUnitSelectorComponent {
  readonly iconTypes = ICON_TYPE;
}
