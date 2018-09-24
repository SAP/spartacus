import { Directive, TemplateRef, Input, OnInit } from '@angular/core';
import { OutletService } from '../outlet.service';

@Directive({
  selector: '[outletRef]'
})
export class OutletRefDirective implements OnInit {
  @Input()
  outletRef: string;

  constructor(private tpl: TemplateRef<any>, private outletService: OutletService) {}

  ngOnInit() {
    this.outletService.add(this.outletRef, this.tpl);
  }
}
