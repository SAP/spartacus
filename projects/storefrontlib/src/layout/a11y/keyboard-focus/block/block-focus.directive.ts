import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { BaseFocusDirective } from '../base/base-focus.directive';
import { BaseFocusService } from '../base/base-focus.service';
import { BlockFocusConfig } from '../keyboard-focus.model';

@Directive({
  selector: '[cxBlockFocus]',
})
export class BlockFocusDirective extends BaseFocusDirective implements OnInit {
  protected defaultConfig: BlockFocusConfig = { block: true };

  @Input('cxBlockFocus') protected config: BlockFocusConfig = {};

  constructor(
    protected elementRef: ElementRef,
    protected service: BaseFocusService
  ) {
    super(elementRef, service);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.config.block) {
      this.tabindex = '-1';
    }
  }
}
