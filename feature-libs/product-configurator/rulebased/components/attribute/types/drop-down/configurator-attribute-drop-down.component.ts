import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit {
  attributeDropDownForm = new FormControl('');

  @Input() group: string;

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute?.selectedSingleValue);
  }

  /**
   TODO(issue: #11238): update @deprecated level to the release we are publishing with,
   It is still 3.1 only because app.module.ts states that we are on 3.1.
   Finally we must have 3.x, x>=2 here
   */
  /**
   * @deprecated since 3.1
   * User better onSelect(this.attributeDropDownForm.value)
   */
  onSelect(): void {
    super.onSelect(this.attributeDropDownForm?.value);
  }
}
