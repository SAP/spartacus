import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-header',
  templateUrl: './configurator-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeHeaderComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  @Input() attribute: Configurator.Attribute;
  @Input() owner: CommonConfigurator.Owner;
  @Input() groupId: string;
  @Input() groupType: Configurator.GroupType;

  iconTypes = ICON_TYPE;
  showRequiredMessageForDomainAttribute$: Observable<boolean>;

  constructor(protected configUtils: ConfiguratorStorefrontUtilsService) {
    super();
  }

  ngOnInit(): void {
    /**
     * Show message that indicates that attribute is required in case attribute has a domain of values
     */
    this.showRequiredMessageForDomainAttribute$ = this.configUtils
      .isCartEntryOrGroupVisited(this.owner, this.groupId)
      .pipe(
        map((result) => (result ? this.isRequiredAttributeWithDomain() : false))
      );
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
      case Configurator.UiType.CHECKBOXLIST_PRODUCT:
      case Configurator.UiType.MULTI_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  protected isSingleSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.RADIOBUTTON:
      case Configurator.UiType.RADIOBUTTON_PRODUCT:
      case Configurator.UiType.CHECKBOX:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.DROPDOWN_PRODUCT:
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  protected isRequiredAttributeWithDomain(): boolean {
    const uiType = this.attribute.uiType;
    return (
      (this.attribute.required &&
        this.attribute.incomplete &&
        uiType !== Configurator.UiType.NOT_IMPLEMENTED &&
        uiType !== Configurator.UiType.STRING &&
        uiType !== Configurator.UiType.NUMERIC) ??
      false
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
    return groupType === Configurator.GroupType.CONFLICT_GROUP
      ? 'configurator.conflict.viewConfigurationDetails'
      : 'configurator.conflict.viewConflictDetails';
  }

  /**
   * Checks if an image is attached
   * @returns True if an only if at least one image exists
   */
  get hasImage(): boolean {
    const images = this.attribute.images;
    return images ? images.length > 0 : false;
  }
  /**
   * Returns image attached to the attribute (if available)
   * @returns Image
   */
  get image(): Configurator.Image | undefined {
    const images = this.attribute.images;
    return images && this.hasImage ? images[0] : undefined;
  }
}
