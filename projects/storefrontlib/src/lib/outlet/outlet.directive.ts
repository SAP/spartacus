import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { OutletService } from './outlet.service';

@Directive({
  selector: '[cxOutlet]'
})
export class OutletDirective implements OnInit {
  @Input('cxOutlet') outlet: string;

  _context;
  @Input()
  set cxOutletContext(value: string) {
    this._context = value;
  }

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private outletService: OutletService
  ) {}

  ngOnInit() {
    const customTemplate = this.outletService.get(this.outlet);

    this.vcr.createEmbeddedView(customTemplate || this.templateRef, {
      $implicit: this.context
    });
  }

  private get context() {
    if (this._context) {
      return this._context;
    }
    const ctx = (<any>this.vcr.injector).view.context;

    // the context might already be given $implicit
    // by a parent *ngIf or *ngFor
    return ctx.$implicit || ctx;
  }
}
