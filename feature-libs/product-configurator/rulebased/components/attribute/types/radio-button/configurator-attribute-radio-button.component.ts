import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';

@Component({
  selector: 'cx-configurator-attribute-radio-button',
  templateUrl: './configurator-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeRadioButtonComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit {
  attributeRadioButtonForm = new FormControl('');

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  /**
   TODO(issue: #11238): update @deprecated level to the release we are publishing with,
   It is still 3.1 only because app.module.ts states that we are on 3.1.
   Finally we must have 3.x, x>=2 here
   */
  /**
   * @deprecated since 3.1
   * User better onSelect('')
   */
  onDeselect(): void {
    this.onSelect('');
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions {
    return super.extractQuantityParameters(undefined);
  }
}
