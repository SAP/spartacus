import {
  Directive,
  TemplateRef,
  Input,
  OnInit,
  ElementRef
} from '@angular/core';

import { OutletStyleService } from '../outlet-style.service';
import { OutletPosition } from '../outlet.model';
import { OutletService } from '../outlet.service';

@Directive({
  selector: '[cxOutletRef]'
})
export class OutletRefDirective implements OnInit {
  @Input()
  cxOutletRef: string;
  @Input()
  cxOutletPos: OutletPosition;

  constructor(
    private tpl: TemplateRef<any>,
    private outletService: OutletService
  ) {}

  ngOnInit() {
    this.outletService.add(this.cxOutletRef, this.tpl, this.cxOutletPos);
  }
}

@Directive({
  selector: '[cxCssRef]'
})
export class CssRefDirective implements OnInit {
  @Input() cxCssRef: string;

  @Input() file: string;

  constructor(
    private element: ElementRef,
    private cssOutletService: OutletStyleService
  ) {}

  ngOnInit() {
    this.cssOutletService.add(this.cxCssRef, this.element);
  }
}
