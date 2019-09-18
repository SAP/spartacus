import { Component, Input, OnInit } from '@angular/core';
import { Attribute, Value } from '@spartacus/core';
@Component({
  selector: 'cx-config-attribute-radio-button',
  templateUrl: './attribute-radio-button.component.html',
})
export class AttributeRadioButtonComponent implements OnInit {
  constructor() {}

  @Input() currentAttribute: Attribute;

  ngOnInit() {}

  public get values(): Value[] {
    return this.currentAttribute.values;
  }
}
