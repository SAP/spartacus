import { Directive, TemplateRef, Input, OnInit } from '@angular/core';
import { OutletService } from '../outlet.service';

@Directive({
  selector: '[cxOutletRef]'
})
export class OutletRefDirective implements OnInit {
  @Input('cxOutletRef') outletRef: string;

  constructor(
    private tpl: TemplateRef<any>,
    private outletService: OutletService
  ) {}

  ngOnInit() {
    this.outletService.add(this.outletRef, this.tpl);
  }
}
