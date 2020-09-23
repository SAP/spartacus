import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { Configurator } from './../../../../core/model/configurator.model';
@Component({
  selector: 'cx-configurator-attribute-radio-button',
  templateUrl: './configurator-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeRadioButtonComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  attributeRadioButtonForm = new FormControl('');
  changeTriggeredByKeyboard = false;

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  onMouseDown(valueCode: string) {
    this.submitValue(valueCode);
  }

  onFocusOut(event: FocusEvent) {
    if (
      this.attributeLostFocus(event) &&
      this.attributeRadioButtonForm.value !== null &&
      this.changeTriggeredByKeyboard === true
    ) {
      this.submitValue(this.attributeRadioButtonForm.value);
    }
  }

  onKeyUp() {
    this.changeTriggeredByKeyboard = true;
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
    // Avoid submit on round-trip (in this case event.relatedTarget is null)
    if (to === null) {
      return attributeLostFocus;
    }
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
    //console.log('the value to submit: ' + valueCode);
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
    this.changeTriggeredByKeyboard = false;
  }
}
