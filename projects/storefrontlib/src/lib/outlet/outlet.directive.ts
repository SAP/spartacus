import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { OutletService } from './outlet.service';
import { OutletPosition } from './outlet.model';

@Directive({
  selector: '[cxOutlet]'
})
export class OutletDirective implements OnInit {
  @Input()
  cxOutlet: string;

  private _context: string;
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
    this.renderTemplate(OutletPosition.BEFORE);
    this.renderTemplate(OutletPosition.REPLACE, true);
    this.renderTemplate(OutletPosition.AFTER);
  }

  private renderTemplate(position: OutletPosition, replace = false): void {
    const template = this.outletService.get(this.cxOutlet, position);
    if (template || replace) {
      this.vcr.createEmbeddedView(template || this.templateRef, {
        $implicit: this.context
      });
    }
  }

  private get context() {
    // return specific context if provided
    if (this._context) {
      return this._context;
    }
    const ctx = (<any>this.vcr.injector).view.context;

    // the context might already be given $implicit
    // by a parent *ngIf or *ngFor
    return ctx.$implicit || ctx;
  }
}
