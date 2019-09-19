import { Component, Input, OnInit } from '@angular/core';
import { Attribute, Value } from '@spartacus/core';
import { UIKeyGeneratorService } from '../../service/ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-radio-button',
  templateUrl: './attribute-radio-button.component.html',
})
export class AttributeRadioButtonComponent implements OnInit {
  constructor(private uiKeyGen: UIKeyGeneratorService) {}

  @Input() currentAttribute: Attribute;

  ngOnInit() {}

  public get values(): Value[] {
    return this.currentAttribute.values;
  }

  public get uiKeyGenerator() {
    return this.uiKeyGen;
  }
}
