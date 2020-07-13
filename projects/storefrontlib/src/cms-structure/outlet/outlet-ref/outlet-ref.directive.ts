import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { FeatureConfigService } from '@spartacus/core';
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

  /**
   * @deprecated since 2.1, see #8201
   */
  constructor(tpl: TemplateRef<any>, outletService: OutletService);
  constructor(
    tpl: TemplateRef<any>,
    outletService: OutletService,
    // tslint:disable-next-line: unified-signatures
    features: FeatureConfigService
  );
  constructor(
    private tpl: TemplateRef<any>,
    private outletService: OutletService,
    private features?: FeatureConfigService
  ) {}

  ngOnInit() {
    this.outletService.add(this.cxOutletRef, this.tpl, this.cxOutletPos);
  }

  ngOnDestroy() {
    if (this.features?.isLevel('2.1')) {
      this.outletService.remove(this.cxOutletRef, this.cxOutletPos, this.tpl);
    }
  }
}
