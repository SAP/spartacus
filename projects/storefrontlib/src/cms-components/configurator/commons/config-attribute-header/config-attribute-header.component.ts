import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator, GenericConfigurator } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { ConfigUIKeyGeneratorService } from '../service/config-ui-key-generator.service';
import { ConfigUtilsService } from '../service/config-utils.service';

@Component({
  selector: 'cx-config-attribute-header',
  templateUrl: './config-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeHeaderComponent {
  constructor(
    private uiKeyGen: ConfigUIKeyGeneratorService,
    private configUtils: ConfigUtilsService
  ) {}

  iconTypes = ICON_TYPE;

  @Input() attribute: Configurator.Attribute;
  @Input() owner: GenericConfigurator.Owner;
  @Input() groupId: string;
  @Input() groupType: Configurator.GroupType;

  showRequiredMessage(): Observable<boolean> {
    return this.configUtils
      .isCartEntryOrGroupVisited(this.owner, this.groupId)
      .pipe(
        map((result) => {
          if (
            result &&
            this.attribute.required &&
            this.attribute.incomplete &&
            this.attribute.uiType !== Configurator.UiType.NOT_IMPLEMENTED
          ) {
            return true;
          }
          return false;
        })
      );
  }

  isSingleSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.RADIOBUTTON:
      case Configurator.UiType.CHECKBOX:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  isMultiSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.CHECKBOXLIST:
      case Configurator.UiType.MULTI_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  getRequiredMessageKey(): string {
    if (this.isSingleSelection()) {
      return 'configurator.attribute.singleSelectRequiredMessage';
    } else if (this.isMultiSelection()) {
      return 'configurator.attribute.multiSelectRequiredMessage';
    }
    //default
    return 'configurator.attribute.singleSelectRequiredMessage';
  }

  get uiKeyGenerator() {
    return this.uiKeyGen;
  }

  /**
   * Verifies whether the group type is attribute group
   *
   * @param groupType {Configurator.GroupType} - group type
   * @return {boolean} - 'true' if the group type is 'attribute group' otherwise 'false'
   */
  isAttributeGroup(groupType: Configurator.GroupType): boolean {
    if (Configurator.GroupType.ATTRIBUTE_GROUP === groupType) {
      return true;
    }
    return false;
  }

  /**
   * Retrieves a certain conflict link key depending on the current group type for translation.
   *
   * @param groupType {Configurator.GroupType}- group type
   * @return {string} - the conflict link key
   */
  getConflictMessageKey(groupType: Configurator.GroupType): string {
    switch (groupType) {
      case Configurator.GroupType.CONFLICT_GROUP: {
        return 'configurator.conflict.viewConfigurationDetails';
      }
      case Configurator.GroupType.ATTRIBUTE_GROUP: {
        return 'configurator.conflict.viewConflictDetails';
      }
      default:
        break;
    }
  }
}
