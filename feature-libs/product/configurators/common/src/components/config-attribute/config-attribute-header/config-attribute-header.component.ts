import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator, GenericConfigurator } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigUtilsService } from '../../service/config-utils.service';

@Component({
  selector: 'cx-config-attribute-header',
  templateUrl: './config-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeHeaderComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() owner: GenericConfigurator.Owner;
  @Input() groupId: string;

  constructor(protected configUtils: ConfigUtilsService) {}

  iconTypes = ICON_TYPE;

  /**
   * Show message that indicates that attribute is required in case attribute has a domain of values
   */
  showRequiredMessageForDomainAttribute(): Observable<boolean> {
    return this.configUtils
      .isCartEntryOrGroupVisited(this.owner, this.groupId)
      .pipe(
        map((result) => (result ? this.isRequiredAttributeWithDomain() : false))
      );
  }

  createAttributeUiKey(prefix: string, attributeId: string): string {
    return ConfigUIKeyGeneratorService.createAttributeUiKey(
      prefix,
      attributeId
    );
  }

  /**
   * Get message key for the required message. Is different for multi- and single selection values
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
}
