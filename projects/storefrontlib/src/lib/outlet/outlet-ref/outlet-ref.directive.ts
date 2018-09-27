import { Directive, TemplateRef, Input, OnInit } from '@angular/core';
import { OutletService } from '../outlet.service';
import { OutletPosition } from '../outlet.model';

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
