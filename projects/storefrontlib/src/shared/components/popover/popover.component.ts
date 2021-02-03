import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'cx-popover',
  templateUrl: './popover.component.html',
})
export class PopoverComponent {
  @Input() content: TemplateRef<any>;
}
