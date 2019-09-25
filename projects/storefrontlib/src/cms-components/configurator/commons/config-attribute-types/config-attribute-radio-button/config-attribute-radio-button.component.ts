import { Component, Input, OnInit } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { UIKeyGeneratorService } from '../../service/ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-radio-button',
  templateUrl: './config-attribute-radio-button.component.html',
})
export class ConfigAttributeRadioButtonComponent implements OnInit {
  constructor(private uiKeyGen: UIKeyGeneratorService) {}

  @Input() currentAttribute: Configurator.Attribute;

  ngOnInit() {}

  public get values(): Configurator.Value[] {
    return this.currentAttribute.values;
  }

  public get uiKeyGenerator() {
    return this.uiKeyGen;
  }
}
