import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  attributeDropDownForm = new FormControl('');
  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
  }
  /**
   * Triggered when a value has been selected
   */
  onSelect(): void {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: this.attributeDropDownForm.value,
      },
    };
    this.selectionChange.emit(event);
  }
}
