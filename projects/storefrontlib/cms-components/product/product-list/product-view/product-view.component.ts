/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { NgClass, NgIf } from '@angular/common';
import { IconComponent } from '../../../misc/icon/icon.component';
import { TranslatePipe } from '../../../../../core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../core/src/i18n/testing/mock-translate.pipe';

export enum ViewModes {
  Grid = 'grid',
  List = 'list',
}

@Component({
    selector: 'cx-product-view',
    templateUrl: './product-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        NgIf,
        IconComponent,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class ProductViewComponent {
  iconTypes = ICON_TYPE;
  @Input()
  mode: ViewModes;
  @Output()
  modeChange = new EventEmitter<ViewModes>();

  get buttonClass() {
    const viewName: string = this.viewMode?.toLowerCase();
    return `cx-product-${viewName}`;
  }

  /**
   *   Display icons inversely to allow users
   *   to see the view they will navigate to
   */
  get viewMode() {
    if (this.mode === 'list') {
      return this.iconTypes.GRID;
    }
    return this.iconTypes.LIST;
  }

  changeMode() {
    const newMode =
      this.mode === ViewModes.Grid ? ViewModes.List : ViewModes.Grid;
    this.modeChange.emit(newMode);
  }
}
