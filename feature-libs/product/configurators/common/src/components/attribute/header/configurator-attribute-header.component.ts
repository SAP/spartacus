import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GenericConfigurator } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorUIKeyGenerator } from '../../service/configurator-ui-key-generator';
import { Configurator } from './../../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-attribute-header',
  templateUrl: './configurator-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeHeaderComponent implements OnInit {
  @Input() attribute: Configurator.Attribute;
  @Input() owner: GenericConfigurator.Owner;
  @Input() groupType: Configurator.GroupType;

  iconTypes = ICON_TYPE;
  showRequiredMessageForDomainAttribute$: Observable<boolean>;

  constructor(protected configUtils: ConfiguratorStorefrontUtilsService) {}

  ngOnInit(): void {
    /**
     * Show message that indicates that attribute is required in case attribute has a domain of values
     */
    this.showRequiredMessageForDomainAttribute$ = this.configUtils
      .isCartEntryOrGroupVisited(this.owner, this.attribute.groupId)
      .pipe(
        map((result) => (result ? this.isRequiredAttributeWithDomain() : false))
      );
  }

  createAttributeUiKey(prefix: string, attributeId: string): string {
    return ConfiguratorUIKeyGenerator.createAttributeUiKey(prefix, attributeId);
  }

  /**
   * Get message key for the required message. Is different for multi- and single selection values
   *  @return {string} - required message key
   */
  getRequiredMessageKey(): string {
    if (this.isSingleSelection()) {
      return 'configurator.attribute.singleSelectRequiredMessage';
    } else if (this.isMultiSelection()) {
      return 'configurator.attribute.multiSelectRequiredMessage';
    } else {
      //input attribute types
      return 'configurator.attribute.singleSelectRequiredMessage';
    }
  }

  protected isMultiSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.CHECKBOXLIST:
      case Configurator.UiType.MULTI_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  protected isSingleSelection(): boolean {
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

  protected isRequiredAttributeWithDomain(): boolean {
    const uiType = this.attribute.uiType;
    return (
      this.attribute.required &&
      this.attribute.incomplete &&
      uiType !== Configurator.UiType.NOT_IMPLEMENTED &&
      uiType !== Configurator.UiType.STRING &&
      uiType !== Configurator.UiType.NUMERIC
    );
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
