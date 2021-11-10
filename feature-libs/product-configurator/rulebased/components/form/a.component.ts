import { Component } from '@angular/core';
import { ConfiguratorAttributeContext } from './configurator-attribute-context.model';

@Component({
  selector: 'cx-a',
  template: '<h1>A component</h1>',
})
export class AComponent {
  constructor(
    protected configuratorAttributeContext: ConfiguratorAttributeContext
  ) {
    console.log(
      'CHHI a component: ' + configuratorAttributeContext.attribute.name
    );
  }
}
