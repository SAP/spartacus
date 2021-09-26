import { Directive, ElementRef, OnInit } from '@angular/core';
import { BaseFocusService } from '../base/base-focus.service';
import { BlockFocusConfig } from '../keyboard-focus.model';
import { VisibleFocusDirective } from '../visible/visible-focus.directive';

@Directive()
// { selector: '[cxBlockFocus]' }
export class BlockFocusDirective
  extends VisibleFocusDirective
  implements OnInit
{
  protected defaultConfig: BlockFocusConfig = { block: true };

  // @Input('cxBlockFocus')
  protected config: BlockFocusConfig = {};

  constructor(
    protected elementRef: ElementRef,
    protected service: BaseFocusService
  ) {
    super(elementRef, service);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.config.block) {
      this.tabindex = -1;
    }
  }
}
