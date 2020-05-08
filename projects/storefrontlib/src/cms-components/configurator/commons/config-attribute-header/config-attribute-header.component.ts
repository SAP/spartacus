import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Configurator,
  GenericConfigurator,
  TranslationService,
} from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../service/config-ui-key-generator.service';

@Component({
  selector: 'cx-config-attribute-header',
  templateUrl: './config-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeHeaderComponent {
  constructor(
    private uiKeyGen: ConfigUIKeyGeneratorService,
    protected translationService: TranslationService
  ) {}

  @Input() attribute: Configurator.Attribute;
  @Input() ownerType: GenericConfigurator.OwnerType;

  showRequiredMessage(): boolean {
    if (
      this.ownerType === GenericConfigurator.OwnerType.CART_ENTRY &&
      this.attribute.required &&
      this.attribute.incomplete &&
      this.attribute.uiType !== Configurator.UiType.NOT_IMPLEMENTED
    ) {
      return true;
    }
    return false;
  }

  isSingleSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.RADIOBUTTON:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  isMultiSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.CHECKBOX:
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
    return;
  }

  get uiKeyGenerator() {
    return this.uiKeyGen;
  }
}
