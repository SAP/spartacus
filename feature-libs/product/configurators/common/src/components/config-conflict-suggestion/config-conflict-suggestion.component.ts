import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';

@Component({
  selector: 'cx-config-conflict-suggestion',
  templateUrl: './config-conflict-suggestion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigConflictSuggestionComponent {
  @Input() currentGroup: Configurator.Group;
  @Input() attribute: Configurator.Attribute;
  @Input() suggestionNumber: number;

  GroupType = Configurator.GroupType;

  constructor() {}

  /**
   * Verifies whether the conflict suggestion should be displayed for the current group.
   *
   * @param {Configurator.Group} group - Current group
   * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
   */
  displayConflictSuggestion(group: Configurator.Group): boolean {
    return (
      group.groupType === Configurator.GroupType.CONFLICT_GROUP &&
      group.attributes?.length > 1
    );
  }
}
