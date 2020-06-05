import { Directive, Input, OnInit, TemplateRef } from '@angular/core';
import { OutletPosition } from '../outlet.model';
import { OutletService } from '../outlet.service';

/**
 * Outlets allow you to customize the standard UI that is provided by letting
 * you plug custom UIinto the standard DOM.
 *
 * Outlets use a string to reference a named outlet. The outlet reference is either
 * hard-coded in Spartacus, or driven by content. In the latter case, the outlets
 * are driven by the customer’s CMS setup.
 */
@Directive({
  selector: '[cxOutletRef]',
})
export class OutletRefDirective implements OnInit {
  /**
   * The outlet reference is either hard-coded in Spartacus, or driven
   * by content. In the latter case, the outlets are driven by
   * the customer’s CMS setup.
   */
  @Input() cxOutletRef: string;

  /**
   * You can use `OutletPosition.BEFORE` or `OutletPosition.AFTER`
   * to add the template before or after the existing UI. If you
   * leave out this optional input, you will replace the existing template.
   */
  @Input() cxOutletPos: OutletPosition;

  /**
   * Skips stacking for the given template.
   *
   * This does not mean that other templates for the given outlet reference
   * will skip stacking as well.
   */
  @Input() cxSkipStacking = false;

  constructor(
    private tpl: TemplateRef<any>,
    private outletService: OutletService
  ) {}

  ngOnInit() {
    this.register();
  }

  /**
   * Registers the template for the given outlet reference.
   */
  protected register(): void {
    this.outletService.add(
      this.cxOutletRef,
      this.tpl,
      this.cxOutletPos,
      this.isStackable
    );
  }

  /**
   * Returns whether the template should be stacked on an already
   * registered template for the given outlet reference.
   */
  protected get isStackable(): boolean {
    if (this.cxSkipStacking.toString() === '') {
      return false;
    } else {
      return !this.cxSkipStacking;
    }
  }
}
