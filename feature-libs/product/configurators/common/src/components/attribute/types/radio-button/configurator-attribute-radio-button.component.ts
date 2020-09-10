import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
@Component({
  selector: 'cx-config-attribute-radio-button',
  templateUrl: './configurator-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeRadioButtonComponent implements OnInit {
  attributeRadioButtonForm = new FormControl('');

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  onMouseDown(valueCode: string) {
    //event.preventDefault();
    console.log('submitMouse: ' + this.attribute.name + ':' + valueCode);
    //this.submitValue(valueCode);
  }

  onFocusOut(event: FocusEvent) {
    if (
      this.attributeLostFocus(event) &&
      this.attributeRadioButtonForm.value !== null
    ) {
      const attributeToSubmit =
        this.attribute.name + ':' + this.attributeRadioButtonForm.value;
      console.log('submitFocus: ' + attributeToSubmit);
      //this.submitValue(this.attributeRadioButtonForm.value);
    }
  }

  /**
   * Returns true if the focus changed from one attribute to any other element.
   * Returns false if the focus change occured inside the same attribute (i.e. from one value to another of the same attribute)
   * @param event FocusEvent to be checked
   */
  attributeLostFocus(event: FocusEvent): boolean {
    let attributeLostFocus = false;
    const from: HTMLElement = event.target as HTMLElement;
    const to: HTMLElement = event.relatedTarget as HTMLElement;
    if (this.getAttributeId(from?.id) !== this.getAttributeId(to?.id)) {
      attributeLostFocus = true;
    }
    return attributeLostFocus;
  }

  /**
   * Removes the value Id from the element id to get the attribute id.
   * @param id HTMLElment id
   */
  getAttributeId(id: string): string {
    const index = id?.lastIndexOf('--');
    return id?.substring(0, index);
  }

  /**
   * Submits the value.
   */
  submitValue(valueCode: string): void {
    console.log('the value to submit: ' + valueCode);
    const event: ConfigFormUpdateEvent = {
      productCode: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        selectedSingleValue: valueCode,
        uiType: this.attribute.uiType,
        groupId: this.attribute.groupId,
      },
    };

    this.selectionChange.emit(event);
  }
  createAttributeValueIdForConfigurator(
    attribute: Configurator.Attribute,
    value: string
  ): string {
    return ConfiguratorUIKeyGenerator.createAttributeValueIdForConfigurator(
      attribute,
      value
    );
  }

  createAttributeIdForConfigurator(attribute: Configurator.Attribute): string {
    return ConfiguratorUIKeyGenerator.createAttributeIdForConfigurator(
      attribute
    );
  }

  createValueUiKey(
    prefix: string,
    attributeId: string,
    valueId: string
  ): string {
    return ConfiguratorUIKeyGenerator.createValueUiKey(
      prefix,
      attributeId,
      valueId
    );
  }

  createAriaLabelledBy(
    prefix: string,
    attributeId: string,
    valueId?: string,
    hasQuantity?: boolean
  ): string {
    return ConfiguratorUIKeyGenerator.createAriaLabelledBy(
      prefix,
      attributeId,
      valueId,
      hasQuantity
    );
  }
}
