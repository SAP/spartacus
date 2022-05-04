import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-radio-button',
  templateUrl: './configurator-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeRadioButtonComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  uiType = Configurator.UiType;
  attributeRadioButtonForm = new FormControl('');

  constructor(protected quantityService: ConfiguratorAttributeQuantityService) {
    super(quantityService);
  }

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  get isAdditionalValueNumeric(): boolean {
    return (
      this.attribute.uiType ===
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT &&
      this.attribute.validationType === Configurator.ValidationType.NUMERIC
    );
  }

  get isAdditionalValueAlphaNumeric(): boolean {
    return (
      this.attribute.uiType ===
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT &&
      this.attribute.validationType === Configurator.ValidationType.NONE
    );
  }
}
