import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InnerComponentsContext } from '@spartacus/storefront';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
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

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected innerComponentsContext: InnerComponentsContext
  ) {
    super(quantityService);
    console.log(
      'CHHI radio button component: ' +
        innerComponentsContext.context.attribute.uiType
    );
    this.attribute = innerComponentsContext.context.attribute;
    this.ownerKey = innerComponentsContext.context.configuration.owner.key;
  }

  onSelect(value: string): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: value,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    //this.selectionChange.emit(event);
    this.innerComponentsContext.context.formComponentForUpdate.updateConfiguration(
      event
    );
  }

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }
}
