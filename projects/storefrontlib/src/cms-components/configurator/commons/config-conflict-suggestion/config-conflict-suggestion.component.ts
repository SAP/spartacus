import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';

@Component({
  selector: 'cx-config-conflict-suggestion',
  templateUrl: './config-conflict-suggestion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigConflictSuggestionComponent {
  GroupType = Configurator.GroupType;

  constructor() {}

  @Input() currentGroup: Configurator.Group;
  @Input() attribute: Configurator.Attribute;
  @Input() suggestionNumber: number;

  displayConflictSuggestion(group: Configurator.Group): boolean {
    return (
      group.groupType === Configurator.GroupType.CONFLICT_GROUP &&
      group.attributes?.length > 1
    );
  }
}
