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
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';

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

  constructor(protected configUtils: ConfiguratorStorefrontUtilsService) {
    super();
  }

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  /**
   * Mouse down event triggers submit value.
   *
   * @param {string} value - Value to update
   */
  onMouseDown(value: string) {
    this.submitValue(value);
  }

  /**
   * Focus out event triggers submit value.
   *
   * @param {FocusEvent} event -Focus event
   */
  onFocusOut(event: FocusEvent) {
    if (
      this.configUtils.attributeLostFocus(event) &&
      this.attributeRadioButtonForm.value !== null &&
      this.changeTriggeredByKeyboard === true
    ) {
      this.submitValue(this.attributeRadioButtonForm?.value);
    }
  }

  /**
   * Key up event sets changeTriggeredByKeyboard to 'true'
   */
  onKeyUp() {
    this.changeTriggeredByKeyboard = true;
  }

  /**
   * Submits a value.
   *
   * @param {string} value - Selected value
   */
  submitValue(value: string): void {
    const event: ConfigFormUpdateEvent = {
      productCode: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        selectedSingleValue: value,
        uiType: this.attribute.uiType,
        groupId: this.attribute.groupId,
      },
    };

    this.selectionChange.emit(event);
    this.changeTriggeredByKeyboard = false;
  }
}
