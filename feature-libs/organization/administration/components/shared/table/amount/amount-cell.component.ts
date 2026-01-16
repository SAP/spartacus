/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '@spartacus/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-amount-cell',
  templateUrl: '../cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, NgTemplateOutlet, UrlPipe],
})
export class AmountCellComponent extends CellComponent {
  get property(): string | undefined {
    if (this.budget && this.currency) {
      return this.budget + ' ' + this.currency;
    }
    return undefined;
  }

  protected get budget() {
    return this.model.budget;
  }

  protected get currency() {
    return this.model.currency?.isocode || this.model.currency;
  }
}
