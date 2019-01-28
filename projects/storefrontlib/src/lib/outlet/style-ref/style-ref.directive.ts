import { ElementRef, OnInit, Input, Directive } from '@angular/core';

import { OutletStyleService } from '../outlet-style.service';

@Directive({
  selector: '[cxCssRef]'
})
export class StyleRefDirective implements OnInit {
  @Input() cxCssRef: string;

  constructor(
    private element: ElementRef,
    private cssOutletService: OutletStyleService
  ) {}

  ngOnInit() {
    this.cssOutletService.add(this.cxCssRef, this.element);
  }
}
