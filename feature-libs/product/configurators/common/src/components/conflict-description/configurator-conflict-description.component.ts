import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-config-conflict-description',
  templateUrl: './configurator-conflict-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorConflictDescriptionComponent {
  @Input() currentGroup: Configurator.Group;

  groupType = Configurator.GroupType;
  iconTypes = ICON_TYPE;

  constructor() {}

  /**
   * Verifies whether the  conflict description should be displayed for the current group.
   *
   * @param {Configurator.Group} group - Current group
   * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
   */
  displayConflictDescription(group: Configurator.Group): boolean {
    return group.groupType === Configurator.GroupType.CONFLICT_GROUP;
  }
}
