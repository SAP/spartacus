import { Directive, Input, OnInit } from '@angular/core';
import { BaseFocusDirective } from '../base/base-focus.directive';
import { BlockFocusConfig } from '../keyboard-focus.model';

@Directive({
  selector: '[cxBlockFocus]',
})
export class BlockFocusDirective extends BaseFocusDirective implements OnInit {
  protected defaultConfig: BlockFocusConfig = { block: true };

  @Input('cxBlockFocus') protected config: BlockFocusConfig = {};

  ngOnInit() {
    super.ngOnInit();
    if (this.config.block) {
      this.tabindex = -1;
    }
  }
}
