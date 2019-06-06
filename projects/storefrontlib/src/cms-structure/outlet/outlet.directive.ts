import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { OutletPosition } from './outlet.model';
import { OutletService } from './outlet.service';

@Directive({
  selector: '[cxOutlet]',
})
export class OutletDirective implements OnInit {
  @Input() cxOutlet: string;

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

  ngOnInit(): void {
    const nodes = [];
    nodes.push(...this.renderTemplate(OutletPosition.BEFORE));
    nodes.push(...this.renderTemplate(OutletPosition.REPLACE, true));
    nodes.push(...this.renderTemplate(OutletPosition.AFTER));
  }

  private renderTemplate(position: OutletPosition, replace = false): any[] {
    const nodes = [];
    const template = this.outletService.get(this.cxOutlet, position);
    if (template || replace) {
      const ref = this.vcr.createEmbeddedView(template || this.templateRef, {
        $implicit: this.context,
      });
      nodes.push(...ref.rootNodes);
    }
    return nodes;
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
