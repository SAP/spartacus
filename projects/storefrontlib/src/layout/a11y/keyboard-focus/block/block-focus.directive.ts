import { Directive, Input, OnInit } from '@angular/core';
import { BaseFocusDirective } from '../base-focus.directive';
import { BlockFocusConfig } from '../keyboard-focus.model';

@Directive({
  selector: '[cxBlockFocus]',
})
export class BlockFocusDirective extends BaseFocusDirective implements OnInit {
  @Input('cxBlockFocus') protected config: BlockFocusConfig;

  ngOnInit() {
    if (this.config.block) {
      this.tabIndex = -1;
    }
  }
}
