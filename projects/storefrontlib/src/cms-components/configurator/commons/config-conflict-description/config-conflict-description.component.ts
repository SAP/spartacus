import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ICON_TYPE } from '../../../misc/icon/icon.model';

@Component({
  selector: 'cx-config-conflict-description',
  templateUrl: './config-conflict-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigConflictDescriptionComponent {
  GroupType = Configurator.GroupType;
  iconTypes = ICON_TYPE;

  constructor() {}

  @Input() currentGroup: Configurator.Group;

  displayConflictDescription(group: Configurator.Group): boolean {
    return group.groupType === Configurator.GroupType.CONFLICT_GROUP;
  }
}
