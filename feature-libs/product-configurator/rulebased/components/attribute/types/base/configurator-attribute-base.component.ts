import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeQuantityService } from '../../quantity';
import { ConfiguratorAttributeTypeUtilsService } from './configurator-attribute-type-utils.service';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ConfiguratorAttributeBaseComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected configAttributeTypeUtilsService: ConfiguratorAttributeTypeUtilsService
  ) {}

  /**
   * Checks if we are supposed to render a quantity control, which
   * can be derived from the attribute meta data.
   *
   * @return {boolean} - Display quantity picker?
   */
  get withQuantity(): boolean {
    return (
      this.quantityService?.withQuantity(
        this.attribute?.dataType ?? Configurator.DataType.NOT_IMPLEMENTED,
        this.attribute?.uiType ?? Configurator.UiType.NOT_IMPLEMENTED
      ) ?? false
    );
  }

  /**
   * Fires an event to handle a quantity.
   *
   * @param {number} quantity - Quantity value
   */
  onHandleQuantity(quantity: number): void {
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        quantity,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
    };

    this.emitEvent(event);
  }

  /**
   * Emits an event containing a given value.
   *
   * @param {ConfigFormUpdateEvent} eventValue - Value to emit
   */
  emitEvent(eventValue: ConfigFormUpdateEvent): void {
    this.loading$.next(true);
    this.selectionChange.emit(eventValue);
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
  ): string {
    return this.configAttributeTypeUtilsService.createValueUiKey(
      prefix,
      attributeId,
      valueId
    );
  }

  /**
   * Creates unique key for config value to be sent to configurator.
   *
   * @param {Configurator.Attribute} currentAttribute - Attribute
   * @param {string} value - value
   * @return {string} - Generated attribute value ID
   */
  createAttributeValueIdForConfigurator(
    currentAttribute: Configurator.Attribute,
    value: string
  ): string {
    return this.configAttributeTypeUtilsService.createAttributeValueIdForConfigurator(
      currentAttribute,
      value
    );
  }

  /**
   * Creates unique key for config attribute to be sent to configurator.
   *
   * @param {Configurator.Attribute} currentAttribute - Attribute
   * @return {string} - Generated attribute ID
   */
  createAttributeIdForConfigurator(
    currentAttribute: Configurator.Attribute
  ): string {
    return this.configAttributeTypeUtilsService.createAttributeIdForConfigurator(
      currentAttribute
    );
  }

  /**
   * Creates unique key for attribute 'aria-labelledby'.
   *
   * @param {string} prefix - Prefix
   * @param {string} attributeId - Attribute ID
   * @param {string} valueId - Value ID
   * @param {boolean} hasQuantity - Has quantity
   * @return {string} - Generated UI key for 'aria-labelledby'
   */
  createAriaLabelledBy(
    prefix: string,
    attributeId: string,
    valueId?: string,
    hasQuantity?: boolean
  ): string {
    return this.configAttributeTypeUtilsService.createAriaLabelledBy(
      prefix,
      attributeId,
      valueId,
      hasQuantity
    );
  }

  /**
   * Creates a unique key for focus handling for the given attribute and value.
   *
   * @param {string} attributeId - Attribute ID
   * @param {string} valueCode - Value Code
   * @return {string} - Generated focus key
   */
  createFocusId(attributeId: string, valueCode: string): string {
    return this.configAttributeTypeUtilsService.createFocusId(
      attributeId,
      valueCode
    );
  }

  /**
   * Get code from attribute.
   * The code is not a mandatory attribute (since not available for VC flavour),
   * still it is mandatory in the context of CPQ. Calling this method therefore only
   * makes sense when CPQ is active. In case the method is called in the wrong context, an exception will
   * be thrown.
   *
   * @param {Configurator.Attribute} attribute - Attribute
   * @returns {number} Attribute code
   */
  getAttributeCode(attribute: Configurator.Attribute): number {
    return this.configAttributeTypeUtilsService.getAttributeCode(attribute);
  }
}
