import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  Renderer2
} from '@angular/core';

import { OutletStyleService } from './outlet-style.service';
import { OutletPosition } from './outlet.model';
import { OutletService } from './outlet.service';

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
    private outletService: OutletService,
    private outletStyleService: OutletStyleService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const nodes = [];
    nodes.push(...this.renderTemplate(OutletPosition.BEFORE));
    nodes.push(...this.renderTemplate(OutletPosition.REPLACE, true));
    nodes.push(...this.renderTemplate(OutletPosition.AFTER));

    this.renderStyleLink(nodes);
  }

  private renderTemplate(position: OutletPosition, replace = false): any[] {
    const nodes = [];
    const template = this.outletService.get(this.cxOutlet, position);
    if (template || replace) {
      const ref = this.vcr.createEmbeddedView(template || this.templateRef, {
        $implicit: this.context
      });
      nodes.push(...ref.rootNodes);
    }
    return nodes;
  }

  private renderStyleLink(nodes: any[]) {
    const styleElement = this.outletStyleService.get(this.cxOutlet);

    if (styleElement) {
      let parentElement = nodes.find(node => node instanceof HTMLElement);

      if (parentElement.shadowRoot) {
        parentElement = parentElement.shadowRoot;
      }
      styleElement.nativeElement.rel = 'stylesheet';
      this.renderer.appendChild(parentElement, styleElement.nativeElement);
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
