import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
} from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeTypeUtilsService } from '../base/configurator-attribute-type-utils.service';

@Component({
  selector: 'cx-configurator-attribute-read-only',
  templateUrl: './configurator-attribute-read-only.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeReadOnlyComponent {
  @Input() attribute: Configurator.Attribute;
  /**
   * @deprecated since 4.1: remove redundant input parameter
   */
  @Input() group: String;

  // TODO(#13286): make ConfiguratorAttributeTypeUtilsService a required dependency
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configAttributeTypeUtilsService: ConfiguratorAttributeTypeUtilsService
  );

  /**
   * @deprecated since 4.1
   */
  constructor();

  constructor(
    @Optional()
    protected configAttributeTypeUtilsService?: ConfiguratorAttributeTypeUtilsService
  ) {}

  /**
   * Creates unique key for config attribute to be sent to configurator.
   *
   * @param {Configurator.Attribute} currentAttribute - Attribute
   * @return {string} - Generated attribute ID
   */
  createAttributeIdForConfigurator(
    currentAttribute: Configurator.Attribute
  ): string | undefined {
    return this.configAttributeTypeUtilsService?.createAttributeIdForConfigurator(
      currentAttribute
    );
  }

  /**
   * Creates unique key for config value on the UI.
   *
   * @param {string} prefix for key depending on usage (e.g. uiType, label)
   * @param {string} attributeId - Attribute ID
   * @param {string} valueId - Value ID
   * @return {string} - Generated value UI key
   */
  createValueUiKey(
    prefix: string,
    attributeId: string,
    valueId: string
  ): string | undefined {
    return this.configAttributeTypeUtilsService?.createValueUiKey(
      prefix,
      attributeId,
      valueId
    );
  }
}
