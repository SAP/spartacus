import { Component, Input, OnInit } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-radio-button',
  templateUrl: './config-attribute-radio-button.component.html',
})
export class ConfigAttributeRadioButtonComponent implements OnInit {
  constructor(public uiKeyGenerator: ConfigUIKeyGeneratorService) {}

  @Input() attribute: Configurator.Attribute;

  ngOnInit() {}
}
