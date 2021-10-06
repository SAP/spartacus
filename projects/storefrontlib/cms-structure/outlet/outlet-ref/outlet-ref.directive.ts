import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { OutletPosition } from '../outlet.model';
import { OutletService } from '../outlet.service';

@Directive({
  selector: '[cxOutletRef]',
})
export class OutletRefDirective implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.outletService.remove(this.cxOutletRef, this.cxOutletPos, this.tpl);
  }
}
