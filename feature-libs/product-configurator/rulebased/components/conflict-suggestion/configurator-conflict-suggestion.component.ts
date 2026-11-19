/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-conflict-suggestion',
  templateUrl: './configurator-conflict-suggestion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, TranslatePipe, IconComponent],
})
export class ConfiguratorConflictSuggestionComponent {
  @Input() currentGroup: Configurator.Group;
  @Input() attribute: Configurator.Attribute;
  @Input() suggestionNumber: number;

  groupType = Configurator.GroupType;
  iconTypes = ICON_TYPE;

  @HostBinding('tabindex') tabindex = '0';
  @HostBinding('attr.role') role = 'note';

  constructor() {
    // Intentional empty constructor
  }

  /**
   * Verifies whether the conflict suggestion should be displayed for the current group.
   *
   * @param {Configurator.Group} group - Current group
   * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
   */
  displayConflictSuggestion(group: Configurator.Group): boolean {
    return group.groupType === Configurator.GroupType.CONFLICT_GROUP &&
      group.attributes
      ? group.attributes.length > 0
      : false;
  }

  createSuggestionUiKey(): string {
    return 'suggestion--' + this.suggestionNumber;
  }
}
